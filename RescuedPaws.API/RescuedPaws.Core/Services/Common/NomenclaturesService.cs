using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Core.Models.Common;
using RescuedPaws.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Common
{
    public class NomenclaturesService : BaseService, INomenclaturesService
    {
        public NomenclaturesService(RescuedPawsDbContext dbContext) : base(dbContext)
        {}

        public async Task<List<Nomenclature<string>>> GetUsers()
        {
            return (from dbUser in _dbContext.Users
                    select new Nomenclature<string>
                    {
                        Id = dbUser.Id,
                        DisplayName = dbUser.UserName
                    }).ToList();
        }
    }
}
