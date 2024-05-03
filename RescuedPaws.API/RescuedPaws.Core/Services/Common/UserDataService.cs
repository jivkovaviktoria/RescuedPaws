using Microsoft.Extensions.Logging;
using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Core.Enums;
using RescuedPaws.Data;
using RescuedPaws.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Common
{
    public class UserDataService : BaseService, IUserDataService
    {
        public UserDataService(RescuedPawsDbContext dbContext, ILogger<BaseService> baseLogger) : base(dbContext, baseLogger)
        { }

        public string[] GetUserPermissions(string userId)
        {
            //if (this.IsAdmin(userId)) 
            return Enum.GetNames(typeof(RpRoutes));

            return new string[] { };
        }

        private bool IsAdmin(string userId)
        {
            var isAdmin = (from dbUser in _dbContext.Users
                           join dbUserRole in _dbContext.UserRoles on dbUser.Id equals dbUserRole.UserId
                           join dbRole in _dbContext.Roles on dbUserRole.RoleId equals dbRole.Id
                           where dbRole.Name == nameof(UserRoles.Admin) && dbUser.Id == userId
                           select dbRole).Any();

            return isAdmin;
        }
    }
}
