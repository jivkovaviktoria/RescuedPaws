using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data;

namespace RescuedPaws.UnitTests
{
    public abstract class BaseTest : IDisposable
    {
        protected readonly RescuedPawsDbContext DbContext;

        public BaseTest()
        {
            var options = TestDbContextOptions.GetOptions("Server=.;Database=RescuedPawsTests;User Id=sa;Password=Vikiviki987;TrustServerCertificate=true");
            DbContext = new RescuedPawsDbContext(options);

            InitializeDatabase().GetAwaiter().GetResult();
        }

        private async Task InitializeDatabase()
        {
            await DbContext.Database.EnsureDeletedAsync(); 
            await DbContext.Database.EnsureCreatedAsync(); 
        }

        public void Dispose() => this.DbContext.Dispose();
    }
}