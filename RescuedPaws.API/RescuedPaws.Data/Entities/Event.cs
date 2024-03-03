using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class Event : IEntity, IAuditableEntity, ISoftDeletableEntity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public Guid LocationID { get; set; }
        public Location Location { get; set; }
        public Guid? ImageID { get; set; }
        public Image Image { get; set; }
        public ICollection<EventUser> Going { get; set; } = new List<EventUser>();
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
