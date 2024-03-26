using RescuedPaws.Core.Models.Administration.Responses;
using RescuedPaws.Core.Models.Common.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    public interface IStatisticsService
    {
        Task<UserCountResponseModel> GetUserCountAsync(DateRequestFilter filter);
        Task<PostCountResponseModel> GetPostCountAsync(DateRequestFilter filter);
        Task<EventCountResponseModel> GetEventCountAsync(DateRequestFilter filter);
    }
}
