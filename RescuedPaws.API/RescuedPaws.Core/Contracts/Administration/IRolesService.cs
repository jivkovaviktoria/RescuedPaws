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
        Task<List<RoleViewModel>> GetRoles();
    }
}
