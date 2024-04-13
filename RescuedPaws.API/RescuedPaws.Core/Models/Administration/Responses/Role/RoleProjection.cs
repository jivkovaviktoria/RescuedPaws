using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Models.Administration.Responses.Roles
{
    public class RoleProjection
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int UsersCount { get; set; }
    }
}
