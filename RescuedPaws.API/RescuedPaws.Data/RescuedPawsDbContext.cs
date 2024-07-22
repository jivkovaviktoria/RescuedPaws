using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data.Configuration.Interceptors;
using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.Data.Entities;
using RescuedPaws.Data.Extensions;
using System.Reflection;

namespace RescuedPaws.Data
{
    public class RescuedPawsDbContext : IdentityDbContext<User, Role, string>
    {
        private bool _showOnlyActive = true;
        private readonly AuditingInterceptor _auditingInterceptor;
        public RescuedPawsDbContext(DbContextOptions<RescuedPawsDbContext> options, AuditingInterceptor auditingInterceptor) : base(options)
        {
            this._auditingInterceptor = auditingInterceptor;
        }

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
            modelBuilder.ApplyQueryFilter<ISoftDeletableEntity>(x => x.IsActive == this._showOnlyActive);

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(this._auditingInterceptor);
            base.OnConfiguring(optionsBuilder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            if (this._showOnlyActive == false) this._showOnlyActive = true;
            return await base.SaveChangesAsync(cancellationToken);
        }

        public void DisableSoftDeleteFilter()
        {
            this._showOnlyActive = false;
        }
    }
}
