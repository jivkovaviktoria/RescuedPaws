using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.ViewModels;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    /// <summary>
    /// Service to manage user-related operations.
    /// </summary>
    public class UsersService : BaseService, IUsersService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UsersService"/> class.
        /// </summary>
        /// <param name="dbContext">Database context for accessing data.</param>
        /// <param name="baseLogger">Logger for logging service operations.</param>
        public UsersService(RescuedPawsDbContext dbContext, ILogger<BaseService> baseLogger)
            : base(dbContext, baseLogger)
        { }

        /// <summary>
        /// Retrieves a list of users with their username and email.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of user view models.</returns>
        public async Task<List<UserViewModel>> GetUsers()
        {
            this._logger.LogInformation("Starting GetUsers operation.");

            try
            {
                var users = await _dbContext.Users
                    .Join(_dbContext.UserRoles, dbUser => dbUser.Id, dbUserRole => dbUserRole.UserId, (dbUser, dbUserRole) => new { dbUser, dbUserRole })
                    .Join(_dbContext.Roles, combined => combined.dbUserRole.RoleId, dbRole => dbRole.Id, (combined, dbRole) => new { combined.dbUser, dbRole })
                    .Where(result => result.dbRole.Name == nameof(UserRoles.User))
                    .Select(result => new UserViewModel
                    {
                        Username = result.dbUser.UserName,
                        Email = result.dbUser.Email
                    })
                    .ToListAsync();

                this._logger.LogInformation("Successfully fetched users.");
                return users;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "An error occurred while fetching users.");
                throw;
            }
        }

        /// <summary>
        /// Retrieves a list of organizations with their username and email.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of user view models.</returns>
        public async Task<List<UserViewModel>> GetOrganizations()
        {
            this._logger.LogInformation("Starting GetOrganizations operation.");

            try
            {
                var organizations = await _dbContext.Users
                    .Join(_dbContext.UserRoles, dbUser => dbUser.Id, dbUserRole => dbUserRole.UserId, (dbUser, dbUserRole) => new { dbUser, dbUserRole })
                    .Join(_dbContext.Roles, combined => combined.dbUserRole.RoleId, dbRole => dbRole.Id, (combined, dbRole) => new { combined.dbUser, dbRole })
                    .Where(result => result.dbRole.Name == nameof(UserRoles.Organization))
                    .Select(result => new UserViewModel
                    {
                        Username = result.dbUser.UserName,
                        Email = result.dbUser.Email
                    })
                    .ToListAsync();

                this._logger.LogInformation("Successfully fetched organizations.");
                return organizations;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "An error occurred while fetching organizations.");
                throw;
            }
        }
    }
}
