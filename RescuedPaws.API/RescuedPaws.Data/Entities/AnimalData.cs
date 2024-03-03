using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class AnimalData : IEntity, ISoftDeletableEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid TypeID { get; set; }
        public AnimalType Type { get; set; }
        public Guid SizeID { get; set; }
        public AnimalSize Size { get; set; }
        public int Age { get; set; }
        public char Gender { get; set; }
        public string HealthStatus { get; set; }
        public string BehavioralInfo { get; set; }
        public List<string> SpecialNeeds { get; set; }
        public string Description { get; set; }

        public Guid PostID { get; set; }
        public Post Post { get; set; }

        public Guid? SuccessStoryID { get; set; }
        public SuccessStory? SuccessStory { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
