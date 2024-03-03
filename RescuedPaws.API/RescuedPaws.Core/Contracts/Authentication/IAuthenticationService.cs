using Microsoft.IdentityModel.Protocols.WSFederation;
using RescuedPaws.Core.Models.Authentication.Requests;
using RescuedPaws.Core.Models.Authentication.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Authentication
{
    /// <summary>
    /// Defines the contract for authentication services, handling user sign-up and sign-in operations.
    /// </summary>
    public interface IAuthenticationService
    {
        /// <summary>
        /// Asynchronously registers a new user based on the provided sign-up request.
        /// </summary>
        /// <param name="request">The sign-up request containing user registration details.</param>
        /// <returns>A task representing the asynchronous operation. The task result contains an <see cref="AuthenticationResponse"/> with the user's authentication details.</returns>
        Task<AuthenticationResponse> SignUp(SignUpRequest request);

        /// <summary>
        /// Asynchronously authenticates a user based on the provided sign-in request.
        /// </summary>
        /// <param name="request">The sign-in request containing user authentication details.</param>
        /// <returns>A task representing the asynchronous operation. The task result contains an <see cref="AuthenticationResponse"/> with the user's authentication token and details.</returns>
        Task<AuthenticationResponse> SignIn(SignInRequest request);
    }
}
