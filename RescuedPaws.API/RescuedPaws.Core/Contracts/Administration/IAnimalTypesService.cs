using RescuedPaws.Core.Models.Administration.Responses.AnimalTypes;
using RescuedPaws.Core.Models.Administration.Responses.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    public interface IAnimalTypesService 
    {
        Task<List<AnimalTypeProjection>> GetAnimalTypes();
        Task<AnimalTypeProjection> GetAnimalType(Guid id);
        Task<AnimalTypeProjection> AddOrUpdateAnimalType(AnimalTypeFormModel model);
        Task<bool> DeleteAnimalType(Guid id);
    }
}
