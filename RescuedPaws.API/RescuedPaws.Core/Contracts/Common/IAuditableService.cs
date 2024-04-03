using RescuedPaws.Data.Contracts.Entities;
using RescuedPaws.DomainModels.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Common
{
    public interface IAuditableService<TEntity>
        where TEntity : IAuditableEntity
    {
        Task<EntityAuditProjection> GetSimpleAudit(Guid id);
    }
}
