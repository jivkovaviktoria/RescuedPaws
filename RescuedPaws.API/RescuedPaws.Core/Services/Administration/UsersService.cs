using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.ViewModels;
using RescuedPaws.Data;
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
                    //where the role is User
                    select new UserViewModel
                    {
                        Username = dbUser.UserName,
                        Email = dbUser.Email
                    }).ToList();
        }

        public async Task<List<UserViewModel>> GetOrganizations()
        {
            return (from dbOrganization in _dbContext.Users
                    // where the role is organization
                    select new UserViewModel
                    {
                        Username = dbOrganization.UserName,
                        Email = dbOrganization.Email
                    }).ToList();
        }
    }
}
