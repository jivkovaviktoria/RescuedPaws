using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.Roles;
using RescuedPaws.Core.Models.Common;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    /// <summary>
    /// Service to manage role-related operations.
    /// </summary>
    public class RolesService : BaseService, IRolesService
    {
        private readonly ILogger<RolesService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="RolesService"/> class.
        /// </summary>
        /// <param name="dbContext">Database context for accessing data.</param>
        /// <param name="logger">Logger for logging role service operations.</param>
        /// <param name="baseLogger">Logger for logging base service operations.</param>
        public RolesService(RescuedPawsDbContext dbContext, ILogger<RolesService> logger, ILogger<BaseService> baseLogger)
            : base(dbContext, baseLogger)
        {
            this._logger = logger;
        }

        /// <summary>
        /// Retrieves a list of roles with their details.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of role projections.</returns>
        public async Task<List<RoleProjection>> GetRoles()
        {
            this._logger.LogInformation("Starting GetRoles operation.");

            try
            {
                return await _dbContext.Roles
                    .Select(dbRole => new RoleProjection
                    {
                        Id = dbRole.Id,
                        Name = dbRole.Name ?? string.Empty,
                        UsersCount = _dbContext.UserRoles.Count(dbUserRole => dbUserRole.RoleId == dbRole.Id)
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "Error getting roles.");
                return new List<RoleProjection>();
            }
        }

        /// <summary>
        /// Retrieves the details of a specific role by its ID.
        /// </summary>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the role form model.</returns>
        public async Task<RoleFormModel> GetRole(string roleId)
        {
            this._logger.LogInformation($"Starting GetRole operation for role ID {roleId}.");

            try
            {
                var role = await _dbContext.Roles.AsNoTracking().FirstOrDefaultAsync(r => r.Id == roleId);

                if (role == null)
                {
                    this._logger.LogWarning($"Role with ID {roleId} not found.");
                    return null;
                }

                return new RoleFormModel
                {
                    Id = role.Id,
                    Name = role.Name,
                    AssignedUsers = await _dbContext.Users
                        .Join(_dbContext.UserRoles, dbUser => dbUser.Id, dbUserRole => dbUserRole.UserId, (dbUser, dbUserRole) => new { dbUser, dbUserRole })
                        .Where(joined => joined.dbUserRole.RoleId == role.Id)
                        .Select(joined => new Nomenclature<string>
                        {
                            Id = joined.dbUser.Id,
                            DisplayName = joined.dbUser.UserName
                        })
                        .ToListAsync()
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"Error getting role by ID {roleId}.");
                return null;
            }
        }

        /// <summary>
        /// Adds or updates a role based on the provided model.
        /// </summary>
        /// <param name="model">The role form model.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the role projection.</returns>
        public async Task<RoleProjection> AddOrUpdateRole(RoleFormModel model)
        {
            this._logger.LogInformation($"Starting AddOrUpdateRole operation for role ID {model.Id}.");

            try
            {
                var role = await _dbContext.Roles.FirstOrDefaultAsync(x => x.Id == model.Id) ?? new Role();
                role.Name = model.Name;
                _dbContext.Roles.Update(role);
                await _dbContext.SaveChangesAsync();

                return new RoleProjection
                {
                    Id = role.Id,
                    Name = role.Name,
                    UsersCount = model.AssignedUsers.Count
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "Error adding or updating role.");
                return null;
            }
        }

        /// <summary>
        /// Deletes a role by its ID.
        /// </summary>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result indicates whether the deletion was successful.</returns>
        public async Task<bool> DeleteRole(string roleId)
        {
            this._logger.LogInformation($"Starting DeleteRole operation for role ID {roleId}.");

            try
            {
                var role = await _dbContext.Roles.FindAsync(roleId);
                if (role == null)
                {
                    this._logger.LogWarning($"Role with ID {roleId} not found.");
                    return false;
                }

                _dbContext.Roles.Remove(role);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"Error deleting role {roleId}.");
                return false;
            }
        }

        /// <summary>
        /// Assigns a role to a user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user nomenclature.</returns>
        public async Task<Nomenclature<string>> AssignRoleToUser(string userId, string roleId)
        {
            this._logger.LogInformation($"Starting AssignRoleToUser operation for user ID {userId} and role ID {roleId}.");

            var user = await _dbContext.Users
                .Where(dbUser => dbUser.Id == userId)
                .Select(dbUser => new Nomenclature<string>
                {
                    Id = dbUser.Id,
                    DisplayName = dbUser.UserName
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                this._logger.LogWarning($"User with ID {userId} not found.");
                return null;
            }

            var roleExists = await _dbContext.Roles.AnyAsync(dbRole => dbRole.Id == roleId);
            if (!roleExists)
            {
                this._logger.LogWarning($"Role with ID {roleId} not found.");
                return null;
            }

            var userRole = new IdentityUserRole<string>
            {
                UserId = user.Id,
                RoleId = roleId
            };

            try
            {
                await _dbContext.UserRoles.AddAsync(userRole);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"Error assigning role {roleId} to user {userId}.");
                return null;
            }
        }

        /// <summary>
        /// Unassigns a role from a user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user nomenclature.</returns>
        public async Task<Nomenclature<string>> UnassignRoleToUser(string userId, string roleId)
        {
            this._logger.LogInformation($"Starting UnassignRoleToUser operation for user ID {userId} and role ID {roleId}.");

            var user = await _dbContext.Users
                .Where(dbUser => dbUser.Id == userId)
                .Select(dbUser => new Nomenclature<string>
                {
                    Id = dbUser.Id,
                    DisplayName = dbUser.UserName
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                this._logger.LogWarning($"User with ID {userId} not found.");
                return null;
            }

            var userRole = await _dbContext.UserRoles
                .Where(dbUserRole => dbUserRole.UserId == userId && dbUserRole.RoleId == roleId)
                .FirstOrDefaultAsync();

            if (userRole == null)
            {
                this._logger.LogWarning($"User role assignment for user ID {userId} and role ID {roleId} not found.");
                return null;
            }

            try
            {
                _dbContext.UserRoles.Remove(userRole);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"Error unassigning role {roleId} from user {userId}.");
                return null;
            }
        }
    }
}
