using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RescuedPaws.Data.Contracts;
using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Configuration.EntitiesConfigurations
{
    public class EventUserConfigurator : IEntityTypeConfiguration<EventUser>
    {
        public void Configure(EntityTypeBuilder<EventUser> builder)
        {
            builder.HasKey(x => new { x.UserID, x.EventID });

            builder.HasOne(x => x.User).WithMany(x => x.GoingOn).HasForeignKey(x => x.UserID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Event).WithMany(x => x.Going).HasForeignKey(x => x.EventID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
