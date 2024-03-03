using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.Data.Contracts.Repositories;
using RescuedPaws.Data.Extensions;
using RescuedPaws.Data.RequestModels;

namespace RescuedPaws.Data.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntity
    {
        private readonly DbContext _dbContext;

        public Repository(DbContext dbContext)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<bool> CreateAsync(TEntity entity, CancellationToken cancellationToken)
        {
            bool isSuccessfull = true;

            try
            {
                await this._dbContext.AddAsync(entity, cancellationToken);
                await this._dbContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception e)
            {
                isSuccessfull = false;
            }

            return isSuccessfull;
        }

        public async Task<bool> DeleteAsync(TEntity entity)
        {
            bool isSuccessfull = true;

            try
            {
                this._dbContext.Remove(entity);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                isSuccessfull = false;
            }

            return isSuccessfull;
        }

        public async Task<TEntity> GetAsync(IEnumerable<Filter<TEntity>> filters, CancellationToken cancellationToken)
        {
            try
            {
                var result = await this._dbContext.Set<TEntity>().Filter(filters).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception)
            {
            }

            return null;
        }

        public async Task<IEnumerable<TEntity>> GetManyAsync(IEnumerable<Filter<TEntity>> filters, CancellationToken cancellationToken)
        {
            try
            {
                var result = await this._dbContext.Set<TEntity>().Filter(filters).ToListAsync(cancellationToken);
                return result;
            }
            catch (Exception)
            {
            }

            return null;
        }

        public async Task<bool> UpdateAsync(TEntity entity, CancellationToken cancellationToken)
        {
            bool isSuccessfull = true;

            try
            {
                this._dbContext.Update(entity);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                isSuccessfull = false;
            }

            return isSuccessfull;
        }
    }
}
