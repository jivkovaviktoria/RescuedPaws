using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Contracts.Entities
{
    /// <summary>
    /// Represents an entity with a unique identifier.
    /// </summary>
    public interface IEntity
    {
        /// <summary>
        /// Unique identifier of the entity.
        /// </summary>
        public Guid Id { get; set; }
    }
}
