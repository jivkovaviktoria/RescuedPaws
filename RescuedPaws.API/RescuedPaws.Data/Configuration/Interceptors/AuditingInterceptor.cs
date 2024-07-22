using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Configuration.Interceptors
{
    /// <summary>
    /// Interceptor to handle auditing fields for entities implementing <see cref="IAuditableEntity"/>.
    /// </summary>
    public class AuditingInterceptor : SaveChangesInterceptor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuditingInterceptor"/> class.
        /// </summary>
        /// <param name="httpContextAccessor">The HTTP context accessor to retrieve the current user.</param>
        public AuditingInterceptor(IHttpContextAccessor httpContextAccessor)
        {
            this._httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Intercepts the saving changes operation to update audit fields.
        /// </summary>
        /// <param name="eventData">Contextual information about the <see cref="DbContext"/>.</param>
        /// <param name="result">The result of the save changes operation.</param>
        /// <returns>The interception result.</returns>
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            this.UpdateAuditFields(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        /// <summary>
        /// Asynchronously intercepts the saving changes operation to update audit fields.
        /// </summary>
        /// <param name="eventData">Contextual information about the <see cref="DbContext"/>.</param>
        /// <param name="result">The result of the save changes operation.</param>
        /// <param name="cancellationToken">A token to observe while waiting for the task to complete.</param>
        /// <returns>A task representing the interception result.</returns>
        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            this.UpdateAuditFields(eventData.Context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        /// <summary>
        /// Updates the audit fields for entities being tracked by the <see cref="DbContext"/>.
        /// </summary>
        /// <param name="context">The <see cref="DbContext"/> instance.</param>
        private void UpdateAuditFields(DbContext context)
        {
            var entries = context.ChangeTracker.Entries();
            var user = this._httpContextAccessor.HttpContext?.User?.Identity?.Name;

            var now = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                if (entry.Entity is IAuditableEntity trackable)
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            trackable.UpdatedBy = user;
                            trackable.UpdatedOn = now;
                            break;
                        case EntityState.Added:
                            trackable.CreatedBy = user;
                            trackable.CreatedOn = now;
                            break;
                    }
                }
            }
        }
    }
}
