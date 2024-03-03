using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.RequestModels
{
    /// <summary>
    /// Represents a generic filter for entites.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity to be filtered. Must implement the IEntity interface.</typeparam>
    public class Filter<TEntity>
        where TEntity : class, IEntity
    {
        /// <summary>
        /// Gets or sets the filter clause as a LINQ expression.
        /// </summary>
        /// <remarks>
        /// This property holds an expression tree that represents a lambda expression,
        /// which in turn is used to filter a collection of entities of type TEntity.
        /// </remarks>
        public Expression<Func<TEntity, bool>> Clause { get; set; }
    }
}
