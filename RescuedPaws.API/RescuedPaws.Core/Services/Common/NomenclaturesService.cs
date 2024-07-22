using Microsoft.Extensions.Logging;
using RescuedPaws.Core.Contracts.Common;
using RescuedPaws.Core.Models.Common;
using RescuedPaws.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Common
{
    /// <summary>
    /// Service to manage nomenclatures.
    /// </summary>
    public class NomenclaturesService : BaseService, INomenclaturesService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="NomenclaturesService"/> class.
        /// </summary>
        /// <param name="dbContext">Database context for accessing data.</param>
        /// <param name="baseLogger">Logger for logging service operations.</param>
        public NomenclaturesService(RescuedPawsDbContext dbContext, ILogger<BaseService> baseLogger)
            : base(dbContext, baseLogger)
        {
        }

        /// <summary>
        /// Retrieves a list of users with their Id and DisplayName.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a list of nomenclature objects.</returns>
        public async Task<List<Nomenclature<string>>> GetUsers()
        {
            this._logger.LogInformation("Starting GetUsers operation.");

            try
            {
                var users = await Task.Run(() =>
                    _dbContext.Users
                        .Select(dbUser => new Nomenclature<string>
                        {
                            Id = dbUser.Id,
                            DisplayName = dbUser.UserName ?? string.Empty
                        })
                        .ToList()
                );

                this._logger.LogInformation("Successfully fetched users.");

                return users;
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "An error occurred while fetching users.");
                throw;
            }
        }
    }
}
