using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.DomainModels.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Common
{
    public abstract class BaseAuditableService<TEntity> : BaseService
        where TEntity : class, IAuditableEntity, IEntity
    {
        protected BaseAuditableService(RescuedPawsDbContext dbContext) : base(dbContext)
        {}
    }
}
