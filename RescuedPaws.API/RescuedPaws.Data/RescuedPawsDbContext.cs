using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data.Entities;
using System.Reflection;

namespace RescuedPaws.Data
{
    public class RescuedPawsDbContext : IdentityDbContext<User>
    {
        public RescuedPawsDbContext(DbContextOptions<RescuedPawsDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
