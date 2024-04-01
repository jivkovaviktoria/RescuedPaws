using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Utilities.Constants
{
    public static class ApiConstants
    {
        public static class AreaRoutes
        {
            public const string Administration = "Administration";
        } 

        public static class AdministrationRoutes
        {
            public static class Users
            {
                public const string GetUsers = "Users";
                public const string GetOrganizations = "Organizations";
            }

            public static class Roles
            {
                public const string GetRoles = "Roles";
            }
            
            public static class Statistics
            {
                public const string UsersCount = "UsersCount";
                public const string PostsCount = "PostsCount";
                public const string EventsCount = "EventsCount";
            }
        }
    }
}
