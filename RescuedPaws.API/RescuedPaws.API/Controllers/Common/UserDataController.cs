using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Contracts.Common;
using System.Security.Claims;
using static RescuedPaws.Utilities.Constants.ApiConstants;
using CommonConstants = RescuedPaws.Utilities.Constants.ApiConstants.Common;

namespace RescuedPaws.API.Controllers.Common
{
    [ApiController]
    [Route(AreaRoutes.Common)]
    public class UserDataController : ControllerBase
    {
        private readonly IUserDataService _userDataService;

        public UserDataController(IUserDataService usersService)
        {
            this._userDataService = usersService;
        }

        [HttpGet]
        [Route(CommonConstants.GetUserPermissions)]
        public async Task<IActionResult> GetUserPermissions()
        {
            var claims = HttpContext.User;

            var userName = claims.Identity?.Name;
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return this.Ok(this._userDataService.GetUserPermissions(userId));
        }

        /*[HttpPost]
        [Route(CommonConstants.SetProfilePicture)]
        public async Task<IActionResult> SetProfilePicture([FromQuery] )
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            return this.Ok(await this._userDataService.SetProfilePicture(userId, model));
        }*/
    }
}
