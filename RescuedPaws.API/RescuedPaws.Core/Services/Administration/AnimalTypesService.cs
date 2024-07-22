using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses.AnimalTypes;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    /// <summary>
    /// Service to manage animal type-related operations.
    /// </summary>
    public class AnimalTypesService : BaseAuditableService<AnimalType>, IAnimalTypesService
    {
        private readonly ILogger<AnimalTypesService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="AnimalTypesService"/> class.
        /// </summary>
        /// <param name="dbContext">Database context for accessing data.</param>
        /// <param name="logger">Logger for logging animal type service operations.</param>
        /// <param name="baseLogger">Logger for logging base service operations.</param>
        public AnimalTypesService(RescuedPawsDbContext dbContext, ILogger<AnimalTypesService> logger, ILogger<BaseService> baseLogger)
            : base(dbContext, baseLogger)
        {
            this._logger = logger;
        }

        /// <summary>
        /// Retrieves a list of animal types.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of animal type projections.</returns>
        public async Task<List<AnimalTypeProjection>> GetAnimalTypes()
        {
            this._logger.LogInformation("Starting GetAnimalTypes operation.");

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
                this._logger.LogError(ex, "Error retrieving animal types.");
                return new List<AnimalTypeProjection>();
            }
        }

        /// <summary>
        /// Retrieves a specific animal type by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal type.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal type projection.</returns>
        public async Task<AnimalTypeProjection> GetAnimalType(Guid id)
        {
            this._logger.LogInformation($"Starting GetAnimalType operation for ID {id}.");

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
                this._logger.LogError(ex, $"Error retrieving animal type with ID {id}.");
                return null;
            }
        }

        /// <summary>
        /// Adds or updates an animal type based on the provided model.
        /// </summary>
        /// <param name="model">The animal type form model.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal type projection.</returns>
        public async Task<AnimalTypeProjection> AddOrUpdateAnimalType(AnimalTypeFormModel model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            this._logger.LogInformation($"Starting AddOrUpdateAnimalType operation for ID {model.Id}.");

            try
            {
                AnimalType animalType;
                if (model.Id.HasValue && model.Id.Value != Guid.Empty)
                {
                    animalType = await _dbContext.AnimalTypes.FirstOrDefaultAsync(at => at.Id == model.Id.Value);
                    if (animalType == null)
                    {
                        this._logger.LogWarning($"Animal type with ID {model.Id.Value} not found.");
                        return null;
                    }
                }
                else
                {
                    animalType = new AnimalType();
                    await _dbContext.AnimalTypes.AddAsync(animalType);
                }

                animalType.Name = model.Name;
                await _dbContext.SaveChangesAsync();

                this._logger.LogInformation($"Successfully added or updated animal type with ID {animalType.Id}.");
                return new AnimalTypeProjection
                {
                    Id = animalType.Id,
                    Name = animalType.Name
                };
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "Error adding or updating animal type.");
                return null;
            }
        }

        /// <summary>
        /// Deletes an animal type by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal type.</param>
        /// <returns>A task that represents the asynchronous operation. The task result indicates whether the deletion was successful.</returns>
        public Task<bool> DeleteAnimalType(Guid id)
        {
            this._logger.LogInformation($"Starting DeleteAnimalType operation for ID {id}.");
            return base.SoftDeleteAsync<AnimalType>(id);
        }

        /// <summary>
        /// Updates an animal type entity with the provided model.
        /// </summary>
        /// <param name="animalType">The animal type entity.</param>
        /// <param name="model">The animal type form model.</param>
        /// <returns>The updated animal type projection.</returns>
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
