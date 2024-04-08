using Microsoft.EntityFrameworkCore;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.ViewModels;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    public class UsersService : BaseService, IUsersService
    {
        public UsersService(RescuedPawsDbContext dbContext) : base(dbContext)
        { }

        public async Task<List<UserViewModel>> GetUsers()
        {
            return (from dbUser in _dbContext.Users
                    join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                    join dbRole in _dbContext.Roles on dbUserRole.RoleId equals dbRole.Id
                    where dbRole.Name == nameof(UserRoles.User)
                    select new UserViewModel
                    {
                        Username = dbUser.UserName,
                        Email = dbUser.Email
                    }).ToList();
        }

        public async Task<List<UserViewModel>> GetOrganizations()
        {
            return (from dbOrganization in _dbContext.Users
                    join dbUserRole in _dbContext.UserRoles on dbOrganization.Id equals dbUserRole.UserId
                    join dbRole in _dbContext.Roles on dbUserRole.RoleId equals dbRole.Id
                    where dbRole.Name == nameof(UserRoles.Organization)
                    select new UserViewModel
                    {
                        Username = dbOrganization.UserName,
                        Email = dbOrganization.Email
                    }).ToList();
        }
    }
}
