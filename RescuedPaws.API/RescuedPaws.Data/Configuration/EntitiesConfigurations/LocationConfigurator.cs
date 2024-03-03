using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Configuration.EntitiesConfigurations
{
    public class LocationConfigurator : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Street).IsRequired();

            builder.HasOne(x => x.Town).WithMany(x => x.Locations).HasForeignKey(x => x.TownID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}