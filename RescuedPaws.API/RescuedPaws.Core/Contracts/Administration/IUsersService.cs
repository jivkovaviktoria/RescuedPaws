using RescuedPaws.Core.Models.Administration.Responses.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    /// <summary>
    /// Interface for managing user and organization-related operations.
    /// </summary>
    public interface IUsersService
    {
        /// <summary>
        /// Retrieves a list of users.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of user view models.</returns>
        Task<List<UserViewModel>> GetUsers();

        /// <summary>
        /// Retrieves a list of organizations.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of organization view models.</returns>
        Task<List<UserViewModel>> GetOrganizations();
    }
}
