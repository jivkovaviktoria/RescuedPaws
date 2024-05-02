using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Configuration.Interceptors
{
    public class AuditingInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            UpdateAuditFields(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            UpdateAuditFields(eventData.Context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private static void UpdateAuditFields(DbContext context)
        {
            var entries = context.ChangeTracker.Entries();
            foreach (var entry in entries)
            {
                if (entry.Entity is IAuditableEntity trackable)
                {
                    var now = DateTime.UtcNow;
                    var user = "SYSTEM";

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
