using RescuedPaws.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class EventUser
    {
        public string UserID { get; set; }
        public User User { get; set; }
        public Guid EventID { get; set; }
        public Event Event { get; set; }
    }
}
