using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<BaseService> _logger;

        protected BaseService(RescuedPawsDbContext dbContext, ILogger<BaseService> logger)
        {
            this._dbContext = dbContext;
            this._logger = logger;
        }

        /// <summary>
        /// Method for soft deleting entity
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>

        public async Task<bool> SoftDeleteAsync<T>(Guid id) where T : class, ISoftDeletableEntity, IEntity
        {
            try
            {
                var entity = await _dbContext.Set<T>().FirstOrDefaultAsync(e => e.Id == id);
                if (entity == null) return false;

                entity.IsActive = false;

                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Error deleting animal type with ID {id}: {ex.Message}");
                return false;
            }

        }
    }
}
