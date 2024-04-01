using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using static RescuedPaws.Utilities.Constants.ApiConstants;
using static RescuedPaws.Utilities.Constants.ApiConstants.AdministrationRoutes;

namespace RescuedPaws.API.Controllers.Administration
{
    [ApiController]
    [Route(AreaRoutes.Administration)]
    public class RolesController : ControllerBase
    {
        private readonly IRolesService _rolesService;

        public RolesController(IRolesService rolesService)
        {
            this._rolesService = rolesService;
        }

        [HttpGet]
        [Route(Roles.GetRoles)]
        public async Task<IActionResult> GetUsers()
        {
            return this.Ok(await this._rolesService.GetRoles());
        }
    }
}
