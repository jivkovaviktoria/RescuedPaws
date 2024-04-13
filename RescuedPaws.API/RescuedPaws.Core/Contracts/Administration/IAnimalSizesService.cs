using RescuedPaws.Core.Models.Administration.Responses.AnimalSize;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    public interface IAnimalSizesService
    {
        Task<List<AnimalSizeProjection>> GetAnimalSizes();
        Task<AnimalSizeProjection> GetAnimalSize(Guid id);
        Task<AnimalSizeProjection> AddOrUpdateAnimalSize(AnimalSizeFormModel model);
        Task<bool> DeleteAnimalSize(Guid id);
    }
}
