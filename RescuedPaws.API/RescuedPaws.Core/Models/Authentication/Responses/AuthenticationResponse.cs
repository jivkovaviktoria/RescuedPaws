using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Models.Authentication.Responses
{
    /// <summary>
    /// Represents the response returned after a user authentication process.
    /// </summary>
    public class AuthenticationResponse
    {
        /// <summary>
        /// Initializes a new instance of the AuthenticationResponse class.
        /// </summary>
        /// <param name="email">The email of the authenticated user.</param>
        /// <param name="username">The username of the authenticated user.</param>
        /// <param name="token">The authentication token, optional and can be empty.</param>
        public AuthenticationResponse(string email, string username, string? token = "")
        {
            this.Email = email;
            this.Username = username;
            this.Token = token;
        }

        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
