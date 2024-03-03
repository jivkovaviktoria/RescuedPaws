using RescuedPaws.Data;
using Microsoft.EntityFrameworkCore;

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
    }
}
