using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Contracts.Entities
{
    /// <summary>
    /// Represents an entity that supports soft deletion, indicating whether it is active or deleted.
    /// </summary>
    public interface ISoftDeletableEntity
    {
        /// <summary>
        /// A value indicating whether the entity is active.
        /// </summary>
        public bool IsActive { get; set; }
    }
}
