using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data;

namespace RescuedPaws.API.ActionFilters
{
    public class ShowInactiveActionFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        { }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var showOnlyActiveValue = context.HttpContext.Request.Query.ToDictionary(x => x.Key, x => x.Value).FirstOrDefault(x => x.Key == "showOnlyActive").Value.ToString();
            if (showOnlyActiveValue != null && showOnlyActiveValue == "false")
            {
                // Get the DbContext from the service provider
                var dbContext = context.HttpContext.RequestServices.GetRequiredService<RescuedPawsDbContext>();
                if (dbContext != null)
                {
                    // Set the query tracking behavior to NoTracking for performance reasons
                    dbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

                    // If there is a method to disable a soft delete filter, call it
                    dbContext.DisableSoftDeleteFilter(); // Make sure such a method exists and is correctly implemented
                }
            }
        }
    }
}
