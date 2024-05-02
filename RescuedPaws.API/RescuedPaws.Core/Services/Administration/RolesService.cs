using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.Roles;
using RescuedPaws.Core.Models.Common;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace RescuedPaws.Core.Services.Administration
{
    public class RolesService : BaseService, IRolesService
    {
        private readonly ILogger<RolesService> _logger;

        public RolesService(RescuedPawsDbContext dbContext, ILogger<RolesService> logger) : base(dbContext)
        {
            this._logger = logger;
        }

        public async Task<List<RoleProjection>> GetRoles()
        {
            try
            {
                return await (from dbRole in _dbContext.Roles
                              select new RoleProjection
                              {
                                  Id = dbRole.Id,
                                  Name = dbRole.Name ?? string.Empty,
                                  UsersCount = (from dbUser in _dbContext.Users
                                                join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                                                where dbUserRole.RoleId == dbRole.Id
                                                select dbUser).Count()
                              }).ToListAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Error getting roles: {ex.Message}");
                return new List<RoleProjection>();
            }
        }

        public async Task<RoleFormModel> GetRole(string roleId)
        {
            try
            {
                var role = await _dbContext.Roles.Where(r => r.Id == roleId).AsNoTracking().FirstOrDefaultAsync();

                if (role == null) return null;

                return new RoleFormModel
                {
                    Id = role.Id,
                    Name = role.Name,
                    AssignedUsers = await (from dbUser in _dbContext.Users
                                           join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                                           where dbUserRole.RoleId == role.Id
                                           select new Nomenclature<string>
                                           {
                                               Id = dbUser.Id,
                                               DisplayName = dbUser.UserName
                                           }).ToListAsync()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting role by ID {roleId}: {ex.Message}");
                return null;
            }
        }

        public async Task<RoleProjection> AddOrUpdateRole(RoleFormModel model)
        {
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
                _logger.LogError($"Error adding or updating role: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteRole(string roleId)
        {
            try
            {
                var role = await _dbContext.Roles.FindAsync(roleId);
                if (role == null) return false;

                _dbContext.Roles.Remove(role);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting role {roleId}: {ex.Message}");
                return false;
            }
        }

        public async Task<Nomenclature<string>> AssignRoleToUser(string userId, string roleId)
        {
            var user = (from dbUser in _dbContext.Users
                        where dbUser.Id == userId
                        select new Nomenclature<string>
                        {
                            Id = dbUser.Id,
                            DisplayName = dbUser.UserName
                        }).FirstOrDefault();

            if (user != null)
            {
                var roleExist = (from dbRole in _dbContext.Roles
                                 where dbRole.Id == roleId
                                 select dbRole).Any();

                if (roleExist)
                {
                    var userRole = new IdentityUserRole<string>
                    {
                        UserId = user.Id,
                        RoleId = roleId
                    };

                    await this._dbContext.UserRoles.AddAsync(userRole);
                    await this._dbContext.SaveChangesAsync();
                }
            }

            return user;
        }

        public async Task<Nomenclature<string>> UnassignRoleToUser(string userId, string roleId)
        {
            var user = (from dbUser in _dbContext.Users
                        where dbUser.Id == userId
                        select new Nomenclature<string>
                        {
                            Id = dbUser.Id,
                            DisplayName = dbUser.UserName
                        }).FirstOrDefault();

            if (user != null)
            {
                var userRole = await (from dbRole in _dbContext.Roles
                                      join dbUserRole in _dbContext.UserRoles on dbRole.Id equals dbUserRole.RoleId
                                      where dbUserRole.RoleId == roleId && dbUserRole.UserId == userId
                                      select dbUserRole).FirstOrDefaultAsync();

                if (userRole != null)
                {
                    this._dbContext.UserRoles.Remove(userRole);
                    await this._dbContext.SaveChangesAsync();
                }
            }

            return user;
        }
    }
}
