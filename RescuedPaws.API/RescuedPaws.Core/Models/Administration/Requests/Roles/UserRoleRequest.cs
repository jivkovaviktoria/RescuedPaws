﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Models.Administration.Requests.Roles
{
    public class UserRoleRequest
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }
    }
}
