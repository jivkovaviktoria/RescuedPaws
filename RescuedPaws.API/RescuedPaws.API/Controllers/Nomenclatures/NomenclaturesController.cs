using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Data.Entities;
using RescuedPaws.Utilities.Constants;
using static RescuedPaws.Utilities.Constants.ApiConstants;
using static RescuedPaws.Utilities.Constants.ApiConstants.AdministrationRoutes;

namespace RescuedPaws.API.Controllers.Nomenclatures
{
    [ApiController]
    [Route(AreaRoutes.Nomenclatures)]
    public class NomenclaturesController : ControllerBase
    {
        private readonly INomenclaturesService _nomenclaturesService;

        public NomenclaturesController(INomenclaturesService nomenclaturesService)
        {
            this._nomenclaturesService = nomenclaturesService;
        }

        [HttpGet]
        [Route(ApiConstants.Nomenclatures.GetUsers)]
        public async Task<IActionResult> GetUsers()
        {
            return this.Ok(await this._nomenclaturesService.GetUsers());
        }
    }
}
