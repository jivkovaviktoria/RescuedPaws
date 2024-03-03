using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.Data.RequestModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Contracts.Repositories
{
    public interface IRepository<TEntity>
        where TEntity : class, IEntity
    {
        Task<TEntity> GetAsync(IEnumerable<Filter<TEntity>> filters, CancellationToken cancellationToken);
        Task<IEnumerable<TEntity>> GetManyAsync(IEnumerable<Filter<TEntity>> filters, CancellationToken cancellationToken);
        Task<bool> CreateAsync(TEntity entity, CancellationToken cancellationToken);
        Task<bool> UpdateAsync(TEntity entity, CancellationToken cancellationToken);
        Task<bool> DeleteAsync(TEntity entity);
    }
}
