using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<AnimalTypesService> _logger;

        public AnimalTypesService(RescuedPawsDbContext dbContext, ILogger<AnimalTypesService> logger, ILogger<BaseService> baseLogger) : base(dbContext, baseLogger)
        {
            this._logger = logger;
        }

        public async Task<List<AnimalTypeProjection>> GetAnimalTypes()
        {
            try
            {
                return await _dbContext.AnimalTypes
                                       .Select(at => new AnimalTypeProjection
                                       {
                                           Id = at.Id,
                                           Name = at.Name
                                       })
                                       .ToListAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Error retrieving animal types: {ex.Message}");
                return new List<AnimalTypeProjection>();
            }
        }


        public async Task<AnimalTypeProjection> GetAnimalType(Guid id)
        {
            try
            {
                return await _dbContext.AnimalTypes
                                       .Where(at => at.Id == id)
                                       .Select(at => new AnimalTypeProjection
                                       {
                                           Id = at.Id,
                                           Name = at.Name
                                       })
                                       .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Error retrieving animal type with ID {id}: {ex.Message}");
                return null;
            }
        }


        public async Task<AnimalTypeProjection> AddOrUpdateAnimalType(AnimalTypeFormModel model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            try
            {
                AnimalType animalType;
                if (model.Id.HasValue && model.Id.Value != Guid.Empty)
                {
                    animalType = await _dbContext.AnimalTypes.FirstOrDefaultAsync(at => at.Id == model.Id.Value);
                    if (animalType == null) return null;
                }
                else
                {
                    animalType = new AnimalType { Name = model.Name };
                    _dbContext.AnimalTypes.Add(animalType);
                }

                animalType.Name = model.Name;
                await _dbContext.SaveChangesAsync();

                return new AnimalTypeProjection
                {
                    Id = animalType.Id,
                    Name = animalType.Name
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Error adding or updating animal type: {ex.Message}");
                return null;
            }
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
