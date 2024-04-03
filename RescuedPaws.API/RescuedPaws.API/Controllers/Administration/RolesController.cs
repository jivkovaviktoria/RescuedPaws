using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.Roles;
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

        [HttpGet]
        [Route(Roles.GetRole)]
        public async Task<IActionResult> GetRole([FromQuery] string roleId)
        {
            var result = await this._rolesService.GetRole(roleId);
            
            if(result != null) return this.Ok(result);
            return this.NotFound();
        }

        [HttpPost]
        [Route(Roles.AddOrUpdateRole)]
        public async Task<IActionResult> AddOrUpdateRole([FromBody] RoleFormModel model)
        {
            return this.Ok(await this._rolesService.AddOrUpdateRole(model));
        }

        [HttpDelete]
        [Route(Roles.DeleteRole)]
        public async Task<IActionResult> DeleteRole([FromQuery] string roleId)
        {
            var result = await this._rolesService.DeleteRole(roleId);
            
            if(result) return this.Ok(result);
            return this.NotFound();
        }
    }
}
