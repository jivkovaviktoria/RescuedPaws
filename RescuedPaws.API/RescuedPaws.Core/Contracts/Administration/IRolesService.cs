using RescuedPaws.Core.Models.Administration.Responses.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    public interface IRolesService
    {
        Task<List<RoleProjection>> GetRoles();
        Task<RoleFormModel> GetRole(string roleId);
        Task<RoleProjection> AddOrUpdateRole(RoleFormModel model);
        Task<bool> DeleteRole(string roleId);
    }
}
