using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.Roles;
using RescuedPaws.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    public class RolesService : BaseService, IRolesService
    {
        public RolesService(RescuedPawsDbContext dbContext) : base(dbContext)
        { }

        public async Task<List<RoleViewModel>> GetRoles()
        {
            return (from dbRole in _dbContext.Roles
                    select new RoleViewModel
                    {
                        Name = dbRole.Name,
                        UsersCount = (from dbUser in _dbContext.Users
                                      join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                                      where dbUserRole.RoleId == dbRole.Id
                                      select dbUser).Count()
                    }).ToList();
        }
    }
}
