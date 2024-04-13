using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.AnimalSize;
using static RescuedPaws.Utilities.Constants.ApiConstants;
using static RescuedPaws.Utilities.Constants.ApiConstants.AdministrationRoutes;

namespace RescuedPaws.API.Controllers.Administration
{
    [ApiController]
    [Route(AreaRoutes.Administration)]
    public class AnimalSizesController : ControllerBase
    {
        private readonly IAnimalSizesService _animalSizesService;

        public AnimalSizesController(IAnimalSizesService animalSizesService)
        {
            this._animalSizesService = animalSizesService;
        }

        [HttpGet]
        [Route(AnimalSizes.GetAll)]
        public async Task<IActionResult> GetUsers()
        {
            return this.Ok(await this._animalSizesService.GetAnimalSizes());
        }

        [HttpGet]
        [Route(AnimalSizes.Get)]
        public async Task<IActionResult> GetAnimalSize(Guid id)
        {
            return this.Ok(await this._animalSizesService.GetAnimalSize(id));
        }   

        [HttpPost]
        [Route(AnimalSizes.AddOrUpdate)]
        public async Task<IActionResult> AddOrUpdateAnimalSize([FromBody] AnimalSizeFormModel model)
        {
            return this.Ok(await this._animalSizesService.AddOrUpdateAnimalSize(model));
        }

        [HttpDelete]
        [Route(AnimalSizes.Delete)]
        public async Task<IActionResult> DeleteAnimalSize(Guid id)
        {
            return this.Ok(await this._animalSizesService.DeleteAnimalSize(id));
        }   
    }
}
