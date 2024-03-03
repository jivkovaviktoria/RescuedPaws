using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RescuedPaws.Data;

namespace RescuedPaws.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly RescuedPawsDbContext _dbContext;

        public AuthenticationController(RescuedPawsDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
    }
}
