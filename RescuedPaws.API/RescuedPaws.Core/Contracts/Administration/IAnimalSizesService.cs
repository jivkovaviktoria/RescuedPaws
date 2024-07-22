using RescuedPaws.Core.Models.Administration.Responses.AnimalSize;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    /// <summary>
    /// Interface for managing animal sizes.
    /// </summary>
    public interface IAnimalSizesService
    {
        /// <summary>
        /// Retrieves a list of all animal sizes.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of animal size projections.</returns>
        Task<List<AnimalSizeProjection>> GetAnimalSizes();

        /// <summary>
        /// Retrieves a specific animal size by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal size.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal size projection.</returns>
        Task<AnimalSizeProjection> GetAnimalSize(Guid id);

        /// <summary>
        /// Adds or updates an animal size based on the provided model.
        /// </summary>
        /// <param name="model">The animal size form model.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the animal size projection.</returns>
        Task<AnimalSizeProjection> AddOrUpdateAnimalSize(AnimalSizeFormModel model);

        /// <summary>
        /// Deletes an animal size by its ID.
        /// </summary>
        /// <param name="id">The ID of the animal size.</param>
        /// <returns>A task that represents the asynchronous operation. The task result indicates whether the deletion was successful.</returns>
        Task<bool> DeleteAnimalSize(Guid id);
    }
}
