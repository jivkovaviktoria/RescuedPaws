using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Models.Common
{
    public class Nomenclature<TKey>
    {
        public TKey Id { get; set; }
        public string DisplayName { get; set; }
    }
}
