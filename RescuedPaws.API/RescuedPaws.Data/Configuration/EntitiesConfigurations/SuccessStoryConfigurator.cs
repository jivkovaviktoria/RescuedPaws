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
    public class SuccessStoryConfigurator : IEntityTypeConfiguration<SuccessStory>
    {
        public void Configure(EntityTypeBuilder<SuccessStory> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.Content).IsRequired();

            builder.HasOne(x => x.AnimalData).WithOne(x => x.SuccessStory).HasForeignKey<SuccessStory>(x => x.AnimalDataID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}