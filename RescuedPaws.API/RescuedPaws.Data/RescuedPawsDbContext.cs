using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data.Entities;
using System.Reflection;

namespace RescuedPaws.Data
{
    public class RescuedPawsDbContext : IdentityDbContext<User>
    {
        public RescuedPawsDbContext(DbContextOptions<RescuedPawsDbContext> options) : base(options)
        { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<AnimalData> AnimalData { get; set; }
        public DbSet<AnimalSize> AnimalSizes { get; set; }
        public DbSet<AnimalType> AnimalTypes { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventUser> EventUsers { get; set; }
        public DbSet<Image> Image { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Town> Towns { get; set; }
        public DbSet<SuccessStory> SuccessStories { get; set; }
        public DbSet<Video> Videos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
