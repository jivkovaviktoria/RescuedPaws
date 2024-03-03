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
    public class PostConfigurator : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.User).WithMany(x => x.Posts).HasForeignKey(x => x.UserID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Location).WithMany(x => x.Posts).HasForeignKey(x => x.LocationID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
