using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<AnimalSizesService> _logger;
        public AnimalSizesService(RescuedPawsDbContext dbContext, ILogger<AnimalSizesService> logger, ILogger<BaseService> baseLogger) : base(dbContext, baseLogger)
        {
            this._logger = logger;
        }

        public async Task<List<AnimalSizeProjection>> GetAnimalSizes()
        {
            try
            {
                return await _dbContext.AnimalSizes
                                       .Select(a => new AnimalSizeProjection
                                       {
                                           Id = a.Id,
                                           Name = a.Name
                                       })
                                       .AsNoTracking()
                                       .ToListAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Failed to retrieve animal sizes: {ex.Message}");
                return new List<AnimalSizeProjection>();
            }
        }

        public async Task<AnimalSizeProjection> GetAnimalSize(Guid id)
        {
            try
            {
                return await _dbContext.AnimalSizes
                                       .Where(a => a.Id == id)
                                       .Select(a => new AnimalSizeProjection
                                       {
                                           Id = a.Id,
                                           Name = a.Name
                                       })
                                       .AsNoTracking()
                                       .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Failed to retrieve animal size with ID {id}: {ex.Message}");
                return null;
            }
        }

        public async Task<AnimalSizeProjection> AddOrUpdateAnimalSize(AnimalSizeFormModel model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            try
            {
                AnimalSize animalSize = await _dbContext.AnimalSizes.FirstOrDefaultAsync(a => a.Id == model.Id.GetValueOrDefault());

                if (model.Id.HasValue && animalSize == null) throw new InvalidOperationException(ErrorMessages.General.NotFound);
                

                if (animalSize == null)
                {
                    animalSize = new AnimalSize { Name = model.Name };
                    _dbContext.AnimalSizes.Add(animalSize);
                }
                else
                {
                    animalSize.Name = model.Name;
                }

                await _dbContext.SaveChangesAsync();

                return new AnimalSizeProjection
                {
                    Id = animalSize.Id,
                    Name = animalSize.Name
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Error adding or updating animal size: {ex.Message}");
                return null;
            }
        }

        public Task<bool> DeleteAnimalSize(Guid id)
        {
            return base.SoftDeleteAsync<AnimalSize>(id);
        }
    }
}
