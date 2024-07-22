using RescuedPaws.Core.Models.Administration.Responses.Roles;
using RescuedPaws.Core.Models.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    /// <summary>
    /// Interface for managing roles and role assignments.
    /// </summary>
    public interface IRolesService
    {
        /// <summary>
        /// Retrieves a list of all roles.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of role projections.</returns>
        Task<List<RoleProjection>> GetRoles();

        /// <summary>
        /// Retrieves the details of a specific role by its ID.
        /// </summary>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the role form model.</returns>
        Task<RoleFormModel> GetRole(string roleId);

        /// <summary>
        /// Adds or updates a role based on the provided model.
        /// </summary>
        /// <param name="model">The role form model.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the role projection.</returns>
        Task<RoleProjection> AddOrUpdateRole(RoleFormModel model);

        /// <summary>
        /// Deletes a role by its ID.
        /// </summary>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result indicates whether the deletion was successful.</returns>
        Task<bool> DeleteRole(string roleId);

        /// <summary>
        /// Assigns a role to a user.
        /// </summary>
        /// <param name="roleId">The ID of the role.</param>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user nomenclature.</returns>
        Task<Nomenclature<string>> AssignRoleToUser(string roleId, string userId);

        /// <summary>
        /// Unassigns a role from a user.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="roleId">The ID of the role.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user nomenclature.</returns>
        Task<Nomenclature<string>> UnassignRoleToUser(string userId, string roleId);
    }
}
