using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services
{
    public class BaseService
    {
        protected readonly RescuedPawsDbContext _dbContext;

        public BaseService(RescuedPawsDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
    }
}
