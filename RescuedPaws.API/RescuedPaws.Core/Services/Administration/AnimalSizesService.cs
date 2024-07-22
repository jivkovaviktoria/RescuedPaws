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
    /// <summary>
    /// Service to manage animal size-related operations.
    /// </summary>
    public class AnimalSizesService : BaseAuditableService<AnimalSize>, IAnimalSizesService
    {
        private readonly ILogger<AnimalSizesService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="AnimalSizesService"/> class.
        /// </summary>
        /// <param name="dbContext">Database context for accessing data.</param>
        /// <param name="logger">Logger for logging animal sizes service operations.</param>
        /// <param name="baseLogger">Logger for logging base service operations.</param>
        public AnimalSizesService(RescuedPawsDbContext dbContext, ILogger<AnimalSizesService> logger, ILogger<BaseService> baseLogger)
            : base(dbContext, baseLogger)
        {
            this._logger = logger;
        }

        /// <summary>
        /// Retrieves a list of animal sizes.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of animal size projections.</returns>
        public async Task<List<AnimalSizeProjection>> GetAnimalSizes()
        {
            this._logger.LogInformation("Starting GetAnimalSizes operation.");

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
                this._logger.LogError(ex, "Failed to retrieve animal sizes.");
                return new List<AnimalSizeProjection>();
            }
        }

        /// <summary>
        /// Retrieves a specific animal size by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal size.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal size projection.</returns>
        public async Task<AnimalSizeProjection> GetAnimalSize(Guid id)
        {
            this._logger.LogInformation($"Starting GetAnimalSize operation for ID {id}.");

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
                this._logger.LogError(ex, $"Failed to retrieve animal size with ID {id}.");
                return null;
            }
        }

        /// <summary>
        /// Adds or updates an animal size based on the provided model.
        /// </summary>
        /// <param name="model">The animal size form model.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal size projection.</returns>
        public async Task<AnimalSizeProjection> AddOrUpdateAnimalSize(AnimalSizeFormModel model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            this._logger.LogInformation($"Starting AddOrUpdateAnimalSize operation for ID {model.Id}.");

            try
            {
                AnimalSize animalSize = await _dbContext.AnimalSizes.FirstOrDefaultAsync(a => a.Id == model.Id.GetValueOrDefault());

                if (model.Id.HasValue && animalSize == null)
                {
                    this._logger.LogWarning($"Animal size with ID {model.Id.Value} not found.");
                    throw new InvalidOperationException(ErrorMessages.General.NotFound);
                }

                if (animalSize == null)
                {
                    animalSize = new AnimalSize { Name = model.Name };
                    await _dbContext.AnimalSizes.AddAsync(animalSize);
                }
                else
                {
                    animalSize.Name = model.Name;
                }

                await _dbContext.SaveChangesAsync();

                this._logger.LogInformation($"Successfully added or updated animal size with ID {animalSize.Id}.");
                return new AnimalSizeProjection
                {
                    Id = animalSize.Id,
                    Name = animalSize.Name
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "Error adding or updating animal size.");
                return null;
            }
        }

        /// <summary>
        /// Deletes an animal size by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal size.</param>
        /// <returns>A task that represents the asynchronous operation. The task result indicates whether the deletion was successful.</returns>
        public Task<bool> DeleteAnimalSize(Guid id)
        {
            this._logger.LogInformation($"Starting DeleteAnimalSize operation for ID {id}.");
            return base.SoftDeleteAsync<AnimalSize>(id);
        }
    }
}
