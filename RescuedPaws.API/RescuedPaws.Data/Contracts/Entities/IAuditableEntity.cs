using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Contracts.Entities
{
    /// <summary>
    /// Represents an entity that tracks audit information, including creation and update details.
    /// </summary>
    public interface IAuditableEntity
    {
        /// <summary>
        /// The username of the user who created the entity.
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// The date and time when the entity was created.
        /// </summary>
        public DateTime CreatedOn { get; set; }

        /// <summary>
        /// The name of the user who last updated the entity.
        /// </summary>
        public string? UpdatedBy { get; set; }

        /// <summary>
        /// The date and time when the entity was last updated.
        /// </summary>
        public DateTime? UpdatedOn { get; set; }
    }
}
