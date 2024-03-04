
using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data;
using RescuedPaws.API.Configuration;
using RescuedPaws.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNet.Identity;
using System.Security.Claims;

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

            builder.Services.AddControllers();
            builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<RescuedPawsDbContext>().AddApiEndpoints();

            builder.ConfigureMSSQLDatabase();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:5000")
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

            app.UseAuthorization();


            app.MapControllers();


            app.Run();
        }
    }
}