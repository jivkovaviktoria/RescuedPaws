using Microsoft.AspNetCore.Identity;
using RescuedPaws.Core.Contracts.Authentication;
using RescuedPaws.Core.Models.Authentication.Requests;
using RescuedPaws.Core.Models.Authentication.Responses;
using RescuedPaws.Data;
using RescuedPaws.Data.Entities;

namespace RescuedPaws.Core.Authentication
{
    /// <summary>
    /// Provides services for user authentication, including sign-in and sign-up functionalities.
    /// </summary>
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ITokenManager _tokenManager;
        private readonly UserManager<User> _userManager;
        private readonly RescuedPawsDbContext _dbContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthenticationService"/> class.
        /// </summary>
        /// <param name="tokenManager">The token manager to create authentication tokens.</param>
        /// <param name="userManager">The user manager to manage user-related operations.</param>
        /// <param name="dbContext">The database context for accessing and managing the data store.</param>
        public AuthenticationService(ITokenManager tokenManager, UserManager<User> userManager, RescuedPawsDbContext dbContext)
        {
            this._tokenManager = tokenManager;
            this._userManager = userManager;
            this._dbContext = dbContext;
        }


        /// <summary>
        /// Asynchronously performs user sign-in.
        /// </summary>
        /// <param name="request">The sign-in request containing user credentials.</param>
        /// <returns>A task representing the asynchronous operation, containing the authentication response with user details and a token.</returns>
        public async Task<AuthenticationResponse> SignIn(SignInRequest request)
        {
            var managedUser = await this._userManager.FindByEmailAsync(request.Name) ?? await this._userManager.FindByNameAsync(request.Name);

            if (managedUser != null)
            {
                var hasValidPassword = await this._userManager.CheckPasswordAsync(managedUser, request.Password);

                if (hasValidPassword)
                {
                    var dbUser = this._dbContext.Set<User>().FirstOrDefault(user => user.Email == request.Name) ??
                                 this._dbContext.Set<User>().FirstOrDefault(user => user.UserName == request.Name);

                    if (dbUser != null)
                    {
                        var accessToken = await this._tokenManager.CreateAuthenticationToken(dbUser);
                        await this._dbContext.SaveChangesAsync();

                        return new AuthenticationResponse(dbUser.UserName, dbUser.Email, accessToken);
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// Asynchronously performs user sign-up.
        /// </summary>
        /// <param name="request">The sign-up request containing user registration details.</param>
        /// <returns>A task representing the asynchronous operation, containing the authentication response with user details.</returns>
        public async Task<AuthenticationResponse?> SignUp(SignUpRequest request)
        {
            var result = await this._userManager.CreateAsync(new User(request.Email, request.Username), request.Password);

            if (result.Succeeded)
            {
                request.Password = string.Empty;
                return new AuthenticationResponse(request.Email, request.Username);
            }

            return null;
        }
    }
}
