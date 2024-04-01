using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Common.Requests;
using RescuedPaws.Utilities.Constants;
using static RescuedPaws.Utilities.Constants.ApiConstants;
using static RescuedPaws.Utilities.Constants.ApiConstants.AdministrationRoutes;

namespace RescuedPaws.API.Controllers.Administration
{
    [ApiController]
    [Route(AreaRoutes.Administration)]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            this._usersService = usersService;
        }

        [HttpGet]
        [Route(Users.GetUsers)]
        public async Task<IActionResult> GetUsers()
        {
            return this.Ok(await this._usersService.GetUsers());
        }

        [HttpGet]
        [Route(Users.GetOrganizations)]
        public async Task<IActionResult> GetOrganizations()
        {
            return this.Ok(await this._usersService.GetOrganizations());
        }
    }
}
