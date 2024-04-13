using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.AnimalTypes;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using RescuedPaws.Utilities.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    public class AnimalTypesService : BaseAuditableService<AnimalType>, IAnimalTypesService
    {
        public AnimalTypesService(RescuedPawsDbContext dbContext) : base(dbContext)
        { }

        public async Task<List<AnimalTypeProjection>> GetAnimalTypes()
        {
            var result = await _dbContext.AnimalTypes
                                         .Select(at => new AnimalTypeProjection
                                         {
                                             Id = at.Id,
                                             Name = at.Name
                                         })
                                         .ToListAsync();

            return result;
        }


        public async Task<AnimalTypeProjection> GetAnimalType(Guid id)
        {
            var result = await _dbContext.AnimalTypes
                                         .Where(at => at.Id == id)
                                         .Select(at => new AnimalTypeProjection
                                         {
                                             Id = at.Id,
                                             Name = at.Name
                                         })
                                         .FirstOrDefaultAsync();

            return result;
        }


        public async Task<AnimalTypeProjection> AddOrUpdateAnimalType(AnimalTypeFormModel model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            AnimalTypeProjection result;
            AnimalType animalType;

            if (model.Id.HasValue)
            {
                animalType = await _dbContext.AnimalTypes.FirstOrDefaultAsync(at => at.Id == model.Id.Value);

                if (animalType == null) throw new InvalidOperationException(ErrorMessages.General.NotFound);

                result = Update(animalType, model);
            }
            else
            {
                animalType = new AnimalType { Name = model.Name, CreatedBy = "VIKTORIYAV", CreatedOn = DateTime.Now };
                _dbContext.AnimalTypes.Add(animalType);
                await _dbContext.SaveChangesAsync();

                result = new AnimalTypeProjection
                {
                    Id = animalType.Id,
                    Name = animalType.Name
                };
            }

            await _dbContext.SaveChangesAsync();
            return result;
        }


        public Task<bool> DeleteAnimalType(Guid id)
        {
            return base.SoftDeleteAsync<AnimalType>(id);
        }

        private AnimalTypeProjection Update(AnimalType animalType, AnimalTypeFormModel model)
        {
            animalType.Name = model.Name;

            return new AnimalTypeProjection
            {
                Id = animalType.Id,
                Name = animalType.Name
            };
        }
    }
}
