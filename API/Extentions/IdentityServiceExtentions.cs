using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extentions
{
    public static class IdentityServiceExtentions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddIdentityCore<AppUser>(opt=>{
            opt.Password.RequireNonAlphanumeric=false;
            opt.User.RequireUniqueEmail=true;
            
        }).AddEntityFrameworkStores<DataContext>();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt=>{
            opt.TokenValidationParameters=new TokenValidationParameters{
                ValidateIssuerSigningKey=true,
                IssuerSigningKey=key,
                ValidateIssuer=false,
                ValidateAudience=false,
            };
        });
        services.AddScoped<TokenService>();
        services.AddAuthorization(op=>{
            op.AddPolicy("IsHostRequired",policy=>{
                policy.Requirements.Add(new IsHostRequirement());
            });
        });
        services.AddTransient<IAuthorizationHandler,IsHostRequirementHandler>();
        return services;
    }
    }
}