using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Authentication
{
    /// <summary>
    /// Defines the contract for a token manager responsible for handling authentication tokens.
    /// </summary>
    public interface ITokenManager
    {
        /// <summary>
        /// Asynchronously creates an authentication token for a given user.
        /// </summary>
        /// <param name="user">The user for whom the authentication token is to be created.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the authentication token as a string.</returns>
        public Task<string> CreateAuthenticationToken(IdentityUser user);
    }
}
