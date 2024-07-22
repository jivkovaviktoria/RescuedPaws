using RescuedPaws.Core.Models.Administration.Responses;
using RescuedPaws.Core.Models.Common.Requests;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    /// <summary>
    /// Interface for managing statistical operations.
    /// </summary>
    public interface IStatisticsService
    {
        /// <summary>
        /// Retrieves the count of users and organizations based on the provided filter.
        /// </summary>
        /// <param name="filter">The filter to specify the date range for the query.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user count response model.</returns>
        Task<UserCountResponseModel> GetUserCountAsync(DateRequestFilter filter);

        /// <summary>
        /// Retrieves the count of posts based on the provided filter.
        /// </summary>
        /// <param name="filter">The filter to specify the date range for the query.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the post count response model.</returns>
        Task<PostCountResponseModel> GetPostCountAsync(DateRequestFilter filter);

        /// <summary>
        /// Retrieves the count of events based on the provided filter.
        /// </summary>
        /// <param name="filter">The filter to specify the date range for the query.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the event count response model.</returns>
        Task<EventCountResponseModel> GetEventCountAsync(DateRequestFilter filter);
    }
}
