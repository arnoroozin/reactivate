using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement:IAuthorizationRequirement
    {
        
    }
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dataContext;
        public IsHostRequirementHandler(DataContext dataContext,IHttpContextAccessor httpContextAccessor)
        {
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
            
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId=context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;
            var activityId = Guid.Parse( _httpContextAccessor.HttpContext?.Request.RouteValues.FirstOrDefault(x => x.Key == "id").Value?.ToString());
            
            var atendee=_dataContext.activityAttendees.AsNoTracking().FirstOrDefaultAsync(x=>x.AppUserId==  userId&&x.ActivityId== activityId).Result;
            if (atendee == null) return Task.CompletedTask;
            if(atendee.IsHost) context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}