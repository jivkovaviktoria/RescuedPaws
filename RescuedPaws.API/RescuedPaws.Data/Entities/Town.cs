using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class Town : IEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Location> Locations { get; set; }
    }
}
