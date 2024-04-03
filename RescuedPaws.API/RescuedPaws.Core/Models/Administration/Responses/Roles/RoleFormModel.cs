using RescuedPaws.Core.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Models.Administration.Responses.Roles
{
    public class RoleFormModel
    {
        public string Name { get; set; }
        public List<Nomenclature<string>> AssignedUsers { get; set; }
    }
}
