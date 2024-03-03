using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class Post : IEntity, IAuditableEntity, ISoftDeletableEntity
    {
        public Guid Id { get; set; }

        public string? UserID { get; set; }
        public User User { get; set; }

        public Guid? LocationID { get; set; }
        public Location Location { get; set; }

        public Guid? AnimalDataID { get; set; }
        public AnimalData AnimalData { get; set; }

        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<Video> Videos { get; set; } = new List<Video>();

        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
