using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.Data.RequestModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Extensions
{
    /// <summary>
    /// Provides extension methods for IQueryable collections.
    /// This class cannot be inherited.
    /// </summary>
    internal static class QueryableExtensions
    {
        /// <summary>
        /// Filters an IQueryable collection based on a set of criteria.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity in the IQueryable collection. Must implement IEntity interface.</typeparam>
        /// <param name="collection">The IQueryable collection to be filtered.</param>
        /// <param name="filters">An IEnumerable of Filter objects, each representing a criterion to filter the collection.</param>
        /// <returns>An IQueryable collection that has been filtered based on the provided criteria.</returns>
        /// <exception cref="ArgumentNullException">Thrown when the 'collection' parameter is null.</exception>
        public static IQueryable<TEntity> Filter<TEntity>(this IQueryable<TEntity> collection, IEnumerable<Filter<TEntity>> filters)
              where TEntity : class, IEntity
        {
            if (collection is null) throw new ArgumentNullException(nameof(collection));

            foreach (var filter in filters)
                collection = collection.Where(filter.Clause);

            return collection;
        }
    }
}
