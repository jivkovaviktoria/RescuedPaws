using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace RescuedPaws.Data.Extensions
{
    /// <summary>
    /// Extension methods for the <see cref="ModelBuilder"/> to apply query filters.
    /// </summary>
    public static class ModelBuilderExtensions
    {
        /// <summary>
        /// Applies a global query filter to all entities of a specified type.
        /// </summary>
        /// <typeparam name="TEntity">The type of the entity to apply the filter to.</typeparam>
        /// <param name="builder">The <see cref="ModelBuilder"/> to apply the filter to.</param>
        /// <param name="filter">The filter expression to apply to the entities.</param>
        public static void ApplyQueryFilter<TEntity>(this ModelBuilder builder, Expression<Func<TEntity, bool>> filter) where TEntity : class
        {
            var entityTypes = builder.Model.GetEntityTypes()
                                           .Where(et => typeof(TEntity).IsAssignableFrom(et.ClrType))
                                           .ToList();

            foreach (var entityType in entityTypes)
            {
                var entityParam = Expression.Parameter(entityType.ClrType, "e");

                var filterBody = ReplacingExpressionVisitor.Replace(filter.Parameters[0], entityParam, filter.Body);

                var existingFilter = entityType.GetQueryFilter();

                if (existingFilter != null)
                {
                    filterBody = ReplacingExpressionVisitor.Replace(entityParam, existingFilter.Parameters[0], filterBody);
                    filterBody = Expression.AndAlso(existingFilter.Body, filterBody);
                    existingFilter = Expression.Lambda(filterBody, existingFilter.Parameters);
                }
                else
                {
                    existingFilter = Expression.Lambda(filterBody, entityParam);
                }

                entityType.SetQueryFilter(existingFilter);
            }
        }
    }
}
