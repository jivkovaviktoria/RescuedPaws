using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Core.Models.Administration.Responses.Roles;
using RescuedPaws.Core.Models.Common;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using Microsoft.AspNetCore.Identity;
using RescuedPaws.DomainModels.Common;
using RescuedPaws.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RescuedPaws.Core.Services.Administration
{
    public class RolesService : BaseService, IRolesService
    {
        public RolesService(RescuedPawsDbContext dbContext) : base(dbContext)
        { }

        public async Task<List<RoleProjection>> GetRoles()
        {
            var res = (from dbRole in _dbContext.Roles
                    select new RoleProjection
                    {
                        Id = dbRole.Id,
                        Name = dbRole.Name ?? string.Empty,
                        UsersCount = (from dbUser in _dbContext.Users
                                      join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                                      where dbUserRole.RoleId == dbRole.Id
                                      select dbUser).Count()
                    }).ToList();

            return res;
        }

        public async Task<RoleFormModel> GetRole(string roleId)
        {
            var role = _dbContext.Roles.Where(role => role.Id == roleId).FirstOrDefault();

            RoleFormModel model = null;

            if(role != null)
            {
                model = new RoleFormModel
                {
                    Name = role.Name,
                    AssignedUsers = (from dbUser in _dbContext.Users
                                     join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                                     where dbUserRole.RoleId == role.Id
                                     select new Nomenclature<string>
                                     {
                                         Id = dbUser.Id,
                                         DisplayName = dbUser.UserName
                                     }).ToList()
                };
            }

            return model;
        }

        public async Task<RoleProjection> AddOrUpdateRole(RoleFormModel model)
        {
            var newRole = new IdentityRole
            {
                Name = model.Name
            };

            //await this._dbContext.Roles.AddAsync(newRole);
            await this._dbContext.SaveChangesAsync();

            foreach(var user in model.AssignedUsers)
            {
                var userRole = new IdentityUserRole<string>
                {
                    UserId = user.Id,
                    RoleId = newRole.Id
                };

                await this._dbContext.UserRoles.AddAsync(userRole);
            }

            await this._dbContext.SaveChangesAsync();

            return new RoleProjection
            {
                Name = newRole.Name,
                UsersCount = model.AssignedUsers.Count,
            };
        }

        public async Task<bool> DeleteRole(string roleId)
        {
            var role = await this._dbContext.Roles.Where(x => x.Id == roleId).FirstOrDefaultAsync();

            if(role != null)
            {
                this._dbContext.Roles.Remove(role);
                await this._dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
