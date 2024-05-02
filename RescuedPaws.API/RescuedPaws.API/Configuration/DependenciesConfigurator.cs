using RescuedPaws.Data;
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Services.Administration;

namespace RescuedPaws.API.Configuration
{
    /// <summary>
    /// Provides configuration services for various dependencies used in the application.
    /// </summary>
    public static class DependenciesConfigurator
    {
        // <summary>
        /// Configures the Microsoft SQL Server database context to be used with Entity Framework Core.
        /// The method adds the database context to the service collection and configures it 
        /// with the connection string provided in the application configuration.
        /// </summary>
        /// <param name="builder">The WebApplicationBuilder instance to configure the services on.</param>
        public static void ConfigureMSSQLDatabase(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<RescuedPawsDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MSSQL")));
        }

        /// <summary>
        /// Configures additional services for the application.
        /// This method is used to add scoped services to the application's service collection.
        /// Scoped services are created once per client request.
        /// </summary>
        /// <param name="builder">The WebApplicationBuilder instance used to configure the application's services.</param>
        public static void ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IStatisticsService, StatisticsService>();
            builder.Services.AddScoped<IUsersService, UsersService>();
            builder.Services.AddScoped<IRolesService, RolesService>();
            builder.Services.AddScoped<INomenclaturesService, NomenclaturesService>();
            builder.Services.AddScoped<IAnimalTypesService, AnimalTypesService>();
            builder.Services.AddScoped<IAnimalSizesService, AnimalSizesService>();
            builder.Services.AddScoped<IUserDataService, UserDataService>();
        }
    }
}
