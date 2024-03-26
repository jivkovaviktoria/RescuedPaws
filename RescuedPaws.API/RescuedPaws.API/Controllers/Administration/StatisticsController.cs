using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Common.Requests;

namespace RescuedPaws.API.Controllers.Administration
{
    [ApiController]
    [Route("Administration")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            this._statisticsService = statisticsService;
        }

        [HttpGet]
        [Route("UsersCount")]
        public async Task<IActionResult> GetUsersCount([FromQuery] DateRequestFilter filter)
        {
            return this.Ok(await this._statisticsService.GetUserCountAsync(filter));
        }

        [HttpGet]
        [Route("PostsCount")]
        public async Task<IActionResult> GetPostsCount([FromQuery] DateRequestFilter filter)
        {
            return this.Ok(await this._statisticsService.GetPostCountAsync(filter));
        }

        [HttpGet]
        [Route("EventsCount")]
        public async Task<IActionResult> GetEventsCount([FromQuery] DateRequestFilter filter)
        {
            return this.Ok(await this._statisticsService.GetEventCountAsync(filter));
        }
    }
}
