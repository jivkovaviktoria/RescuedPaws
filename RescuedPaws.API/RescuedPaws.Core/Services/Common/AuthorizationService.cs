using Microsoft.AspNetCore.Identity;
using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Common
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly RescuedPawsDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public AuthorizationService(RescuedPawsDbContext dbContext, UserManager<User> userManager)
        {
            this._dbContext = dbContext;
            this._userManager = userManager;

        }

        public async Task<bool> IsAdmin(string userId)
        {
            var user = await this._userManager.FindByIdAsync(userId);
            return await this._userManager.IsInRoleAsync(user, "Admin");
        }
    }
}
