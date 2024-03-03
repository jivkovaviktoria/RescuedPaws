using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class Location : IEntity
    {
        public Guid Id { get; set; }
        public string Street { get; set; }
        public Guid TownID { get; set; }
        public Town Town { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}
