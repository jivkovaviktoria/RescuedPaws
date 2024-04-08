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
    public abstract class BaseService
    {
        protected readonly RescuedPawsDbContext _dbContext;

        protected BaseService(RescuedPawsDbContext dbContext)
        {
           this._dbContext = dbContext;
        }
    }
}
