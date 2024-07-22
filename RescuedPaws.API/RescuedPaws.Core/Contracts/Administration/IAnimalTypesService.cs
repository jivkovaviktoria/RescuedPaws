using RescuedPaws.Core.Models.Administration.Responses.AnimalTypes;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    /// <summary>
    /// Interface for managing animal types.
    /// </summary>
    public interface IAnimalTypesService
    {
        /// <summary>
        /// Retrieves a list of all animal types.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of animal type projections.</returns>
        Task<List<AnimalTypeProjection>> GetAnimalTypes();

        /// <summary>
        /// Retrieves a specific animal type by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal type.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal type projection.</returns>
        Task<AnimalTypeProjection> GetAnimalType(Guid id);

        /// <summary>
        /// Adds or updates an animal type based on the provided model.
        /// </summary>
        /// <param name="model">The animal type form model.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal type projection.</returns>
        Task<AnimalTypeProjection> AddOrUpdateAnimalType(AnimalTypeFormModel model);

        /// <summary>
        /// Deletes an animal type by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal type.</param>
        /// <returns>A task that represents the asynchronous operation. The task result indicates whether the deletion was successful.</returns>
        Task<bool> DeleteAnimalType(Guid id);
    }
}
