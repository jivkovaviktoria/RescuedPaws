using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses;
using RescuedPaws.Core.Models.Common.Requests;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Utilities.Enums;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    /// <summary>
    /// Service to manage statistics-related operations.
    /// </summary>
    public class StatisticsService : BaseService, IStatisticsService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StatisticsService"/> class.
        /// </summary>
        /// <param name="dbContext">Database context for accessing data.</param>
        /// <param name="baseLogger">Logger for logging service operations.</param>
        public StatisticsService(RescuedPawsDbContext dbContext, ILogger<BaseService> baseLogger)
            : base(dbContext, baseLogger)
        { }

        /// <summary>
        /// Retrieves the count of users and organizations.
        /// </summary>
        /// <param name="filter">Filter to specify date range for the query.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user count response model.</returns>
        public async Task<UserCountResponseModel> GetUserCountAsync(DateRequestFilter filter)
        {
            this._logger.LogInformation("Starting GetUserCountAsync operation.");

            try
            {
                var usersCount = await _dbContext.Users
                    .Join(_dbContext.UserRoles, user => user.Id, userRole => userRole.UserId, (user, userRole) => new { user, userRole })
                    .Join(_dbContext.Roles, combined => combined.userRole.RoleId, role => role.Id, (combined, role) => new { combined.user, role })
                    .Where(result => result.role.Name == nameof(UserRoles.User))
                    .CountAsync();

                var organizationsCount = await _dbContext.Users
                    .Join(_dbContext.UserRoles, user => user.Id, userRole => userRole.UserId, (user, userRole) => new { user, userRole })
                    .Join(_dbContext.Roles, combined => combined.userRole.RoleId, role => role.Id, (combined, role) => new { combined.user, role })
                    .Where(result => result.role.Name == nameof(UserRoles.Organization))
                    .CountAsync();

                this._logger.LogInformation("Successfully fetched user and organization counts.");
                return new UserCountResponseModel
                {
                    UsersCount = usersCount,
                    OrganizationsCount = organizationsCount
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "An error occurred while fetching user and organization counts.");
                throw;
            }
        }

        /// <summary>
        /// Retrieves the count of posts.
        /// </summary>
        /// <param name="filter">Filter to specify date range for the query.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the post count response model.</returns>
        public async Task<PostCountResponseModel> GetPostCountAsync(DateRequestFilter filter)
        {
            this._logger.LogInformation("Starting GetPostCountAsync operation.");

            try
            {
                var postsCount = await _dbContext.Posts.CountAsync();

                this._logger.LogInformation("Successfully fetched post count.");
                return new PostCountResponseModel { Value = postsCount };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "An error occurred while fetching post count.");
                throw;
            }
        }

        /// <summary>
        /// Retrieves the count of events.
        /// </summary>
        /// <param name="filter">Filter to specify date range for the query.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the event count response model.</returns>
        public async Task<EventCountResponseModel> GetEventCountAsync(DateRequestFilter filter)
        {
            this._logger.LogInformation("Starting GetEventCountAsync operation.");

            try
            {
                var eventsCount = await _dbContext.Events.CountAsync();

                this._logger.LogInformation("Successfully fetched event count.");
                return new EventCountResponseModel { Value = eventsCount };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "An error occurred while fetching event count.");
                throw;
            }
        }
    }
}
