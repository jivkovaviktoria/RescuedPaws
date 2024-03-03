using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class AnimalType : IEntity, IAuditableEntity, ISoftDeletableEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<AnimalData> AnimalsData { get; set; } = new List<AnimalData>();
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
