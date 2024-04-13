using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data;
using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.Data.Contracts.Repositories;
using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Common
{
    /// <summary>
    /// Abstract class for common service functionality
    /// </summary>
    public abstract class BaseService
    {
        protected readonly RescuedPawsDbContext _dbContext;

        protected BaseService(RescuedPawsDbContext dbContext)
        {
           this._dbContext = dbContext;
        }

        /// <summary>
        /// Method for soft deleting entity
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>

        public async Task<bool> SoftDeleteAsync<T>(Guid id) where T : class, ISoftDeletableEntity, IEntity
        {
            var entity = await _dbContext.Set<T>().FirstOrDefaultAsync(e => e.Id == id);
            if (entity == null) return false;

            entity.IsActive = false;

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
