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
    public class AnimalDataConfigurator : IEntityTypeConfiguration<AnimalData>
    {
        public void Configure(EntityTypeBuilder<AnimalData> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.TypeID).IsRequired();
            builder.Property(x => x.SizeID).IsRequired();
            builder.Property(x => x.Gender).IsRequired().HasMaxLength(1);
            builder.Property(x => x.PostID).IsRequired();

            builder.HasOne(x => x.Type).WithMany(x => x.AnimalsData).HasForeignKey(x => x.TypeID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Size).WithMany(x => x.AnimalsData).HasForeignKey(x => x.SizeID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Post).WithOne(x => x.AnimalData).HasForeignKey<AnimalData>(x => x.PostID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
