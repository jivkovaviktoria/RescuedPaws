using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TryAtSoftware.Randomizer.Core;
using TryAtSoftware.Randomizer.Core.Primitives;

namespace RescuedPaws.UnitTests.Randomizers
{
    internal class AnimalSizeRandomizer : ComplexRandomizer<AnimalSize>
    {
        public AnimalSizeRandomizer()
        {
            this.Randomize(x => x.Name, new StringRandomizer());
            this.Randomize(x => x.CreatedBy, new StringRandomizer());
            this.Randomize(x => x.CreatedOn, new DateTimeOffsetRandomizer());
        }   
    }
}
