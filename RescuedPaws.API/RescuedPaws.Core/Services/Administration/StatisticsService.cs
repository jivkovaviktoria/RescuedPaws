using Microsoft.Extensions.Logging;
using RescuedPaws.Core.Contracts.Administration;
using RescuedPaws.Core.Models.Administration.Responses;
using RescuedPaws.Core.Models.Common.Requests;
using RescuedPaws.Core.Services.Common;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;
using RescuedPaws.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Services.Administration
{
    public class StatisticsService : BaseService, IStatisticsService
    {
        public StatisticsService(RescuedPawsDbContext dbContext, ILogger<BaseService> baseLogger) : base(dbContext, baseLogger)
        { }

        public async Task<UserCountResponseModel> GetUserCountAsync(DateRequestFilter filter)
        {
            var usersCount = (from user in _dbContext.Users
                              join userRole in _dbContext.UserRoles on user.Id equals userRole.UserId
                              join role in _dbContext.Roles on userRole.RoleId equals role.Id
                              where role.Name == nameof(UserRoles.User)
                              select user).Count();

            var organizationsCount = (from organization in _dbContext.Users
                                      join userRole in _dbContext.UserRoles on organization.Id equals userRole.UserId
                                      join role in _dbContext.Roles on userRole.RoleId equals role.Id
                                      where role.Name == nameof(UserRoles.Organization)
                                      select organization).Count();


            return new UserCountResponseModel()
            {
                UsersCount = usersCount,
                OrganizationsCount = organizationsCount
            };
        }

        public async Task<PostCountResponseModel> GetPostCountAsync(DateRequestFilter filter)
        {
            var postsCount = (from post in _dbContext.Posts
                              select post).Count();

            return new PostCountResponseModel() { Value = postsCount };
        }

        public async Task<EventCountResponseModel> GetEventCountAsync(DateRequestFilter filter)
        {
            var eventsCount = (from dbEvent in _dbContext.Events
                               select dbEvent).Count();

            return new EventCountResponseModel() { Value = eventsCount };
        }
    }
}
