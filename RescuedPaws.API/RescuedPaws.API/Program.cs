
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data;
using RescuedPaws.API.Configuration;
using RescuedPaws.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using RescuedPaws.Core.Services.Common;
using Microsoft.AspNetCore.Builder;
using RescuedPaws.API.ActionFilters;

namespace RescuedPaws.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
            builder.Services.AddAuthorizationBuilder();

            // Add services to the container.
            builder.ConfigureMSSQLDatabase();
            builder.ConfigureServices();

            builder.Services.AddControllers(config =>
            {
                config.Filters.Add(new ShowInactiveActionFilter());
            });

            builder.ConfigureServices();
            builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<RescuedPawsDbContext>().AddApiEndpoints();


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            var app = builder.Build();
            app.UseCors();

            app.MapGroup("/authentication").MapIdentityApi<User>();
            app.MapGet("/", (ClaimsPrincipal user) => $"Hello {user.Identity!.Name}").RequireAuthorization();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();


            app.Run();
        }
    }
}