using Microsoft.EntityFrameworkCore;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.AnimalSize;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using RescuedPaws.Utilities.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    public class AnimalSizesService : BaseAuditableService<AnimalSize>, IAnimalSizesService
    {
        public AnimalSizesService(RescuedPawsDbContext dbContext) : base(dbContext)
        { }

        public async Task<List<AnimalSizeProjection>> GetAnimalSizes()
        {
            var result = await _dbContext.AnimalSizes
                                         .Select(a => new AnimalSizeProjection
                                         {
                                             Id = a.Id,
                                             Name = a.Name
                                         })
                                         .ToListAsync();

            return result;
        }

        public async Task<AnimalSizeProjection> GetAnimalSize(Guid id)
        {
            var result = await _dbContext.AnimalSizes
                                         .Where(a => a.Id == id)
                                         .Select(a => new AnimalSizeProjection
                                         {
                                             Id = a.Id,
                                             Name = a.Name
                                         })
                                         .FirstOrDefaultAsync();

            return result;
        }

        public async Task<AnimalSizeProjection> AddOrUpdateAnimalSize(AnimalSizeFormModel model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            AnimalSizeProjection result;
            AnimalSize animalSize;

            if (model.Id.HasValue)
            {
                animalSize = await _dbContext.AnimalSizes.FirstOrDefaultAsync(a => a.Id == model.Id.Value);

                if (animalSize == null) throw new InvalidOperationException(ErrorMessages.General.NotFound);

                result = Update(animalSize, model);
            }
            else
            {
                animalSize = new AnimalSize { Name = model.Name, CreatedBy = "VIKTORIYAV", CreatedOn = DateTime.Now};
                _dbContext.AnimalSizes.Add(animalSize);
                await _dbContext.SaveChangesAsync();

                result = new AnimalSizeProjection
                {
                    Id = animalSize.Id,
                    Name = animalSize.Name
                };
            }

            await _dbContext.SaveChangesAsync();
            return result;
        }

        public Task<bool> DeleteAnimalSize(Guid id)
        {
            return base.SoftDeleteAsync<AnimalSize>(id);
        }

        private AnimalSizeProjection Update(AnimalSize animalSize, AnimalSizeFormModel model)
        {
            animalSize.Name = model.Name;

            return new AnimalSizeProjection
            {
                Id = animalSize.Id,
                Name = animalSize.Name
            };
        }
    }
}
