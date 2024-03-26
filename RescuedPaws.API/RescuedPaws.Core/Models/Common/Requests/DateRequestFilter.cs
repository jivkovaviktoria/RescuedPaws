using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Models.Common.Requests
{
    public class DateRequestFilter
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
