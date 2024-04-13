using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.AnimalTypes;
using RescuedPaws.Data.Entities;
using static RescuedPaws.Utilities.Constants.ApiConstants;
using static RescuedPaws.Utilities.Constants.ApiConstants.AdministrationRoutes;

namespace RescuedPaws.API.Controllers.Administration
{
    [ApiController]
    [Route(AreaRoutes.Administration)]
    public class AnimalTypesController : ControllerBase
    {
        private readonly IAnimalTypesService _animalTypesService;

        public AnimalTypesController(IAnimalTypesService animalTypesService)
        {
            this._animalTypesService = animalTypesService;
        }

        [HttpGet]
        [Route(AnimalTypes.GetAll)]
        public async Task<IActionResult> GetAnimalTypes()
        {
            return this.Ok(await this._animalTypesService.GetAnimalTypes());
        }

        [HttpGet]
        [Route(AnimalTypes.Get)]
        public async Task<IActionResult> GetAnimalType([FromQuery] Guid id)
        {
            return this.Ok(await this._animalTypesService.GetAnimalType(id));
        }

        [HttpPost]
        [Route(AnimalTypes.AddOrUpdate)]
        public async Task<IActionResult> AddOrUpdateAnimalType([FromBody] AnimalTypeFormModel model)
        {
            return this.Ok(await this._animalTypesService.AddOrUpdateAnimalType(model));
        }

        [HttpDelete]
        [Route(AnimalTypes.Delete)]
        public async Task<IActionResult> DeleteAnimalType([FromQuery] Guid id)
        {
            return this.Ok(await this._animalTypesService.DeleteAnimalType(id));
        }
    }
}
