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
    public class ImageConfigurator : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Url).IsRequired();

            builder.HasOne(x => x.Post).WithMany(x => x.Images).HasForeignKey(x => x.PostID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.SuccessStory).WithMany(x => x.Images).HasForeignKey(x => x.SuccessStoryID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Event).WithOne(x => x.Image).HasForeignKey<Image>(x => x.EventID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}