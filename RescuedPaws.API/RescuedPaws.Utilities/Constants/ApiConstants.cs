using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Utilities.Constants
{
    /// <summary>
    /// Constants for the API
    /// </summary>
    public static class ApiConstants
    {
        /// <summary>
        /// Routes for the areas
        /// </summary>
        public static class AreaRoutes
        {
            public const string Administration = "Administration";
            public const string Nomenclatures = "Nomenclatures";
        } 

        /// <summary>
        /// Routes for the administration area
        /// </summary>
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
                public const string GetRole = "Role";
                public const string AddOrUpdateRole = "Role";
                public const string DeleteRole = "Role";
                public const string AssignToUser = "AssignToUser";
            }

            public static class AnimalTypes
            {
                public const string GetAll = "AnimalTypes";
                public const string Get = "AnimalType";
                public const string AddOrUpdate = "AnimalType";
                public const string Delete = "AnimalType";
            }
            
            public static class AnimalSizes
            {
                public const string GetAll = "AnimalSizes";
                public const string Get = "AnimalSize";
                public const string AddOrUpdate = "AnimalSize";
                public const string Delete = "AnimalSize";
            }

            public static class Statistics
            {
                public const string UsersCount = "UsersCount";
                public const string PostsCount = "PostsCount";
                public const string EventsCount = "EventsCount";
            }
        }

        /// <summary>
        /// Nomenclatures routes
        /// </summary>
        public static class Nomenclatures
        {
            public const string GetUsers = "Users";
        }
    }
}
