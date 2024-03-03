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
    public class EventConfigurator : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.Description).IsRequired();
            builder.Property(x => x.Date).IsRequired();

            builder.HasOne(x => x.Location).WithMany(x => x.Events).HasForeignKey(x => x.LocationID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Image).WithOne(x => x.Event).HasForeignKey<Event>(x => x.ImageID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}