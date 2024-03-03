using Microsoft.AspNetCore.Identity;
using RescuedPaws.Core.Contracts.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Globalization;

namespace RescuedPaws.Core.Authentication
{
    /// <summary>
    /// Manages the creation of JWT tokens for authentication purposes.
    /// </summary>
    public class TokenManager : ITokenManager
    {
        private readonly int _expirationTimeInMinutes = 30;

        /// <summary>
        /// Asynchronously creates an authentication JWT token for a given user.
        /// </summary>
        /// <param name="user">The user for whom the JWT token is created.</param>
        /// <returns>A task representing the asynchronous operation. The task result contains the JWT token as a string.</returns>
        public async Task<string> CreateAuthenticationToken(IdentityUser user)
        {
            var expires = DateTime.UtcNow.AddMinutes(this._expirationTimeInMinutes);
            var token = this.CreateToken(CreateClaims(user), this.CreateSigningCredentials(), expires);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Creates a JWT security token.
        /// </summary>
        /// <param name="claims">The claims to be included in the token.</param>
        /// <param name="credentials">The signing credentials for the token.</param>
        /// <param name="expires">The expiration time of the token.</param>
        /// <returns>A JWT security token.</returns>
        private JwtSecurityToken CreateToken(List<Claim> claims, SigningCredentials credentials, DateTime expires)
        {
            return new("RescuedPaws.API", "RescuedpPaws.API", claims, expires: expires, signingCredentials: credentials);
        }

        /// <summary>
        /// Creates a list of claims for a given user.
        /// </summary>
        /// <param name="user">The user for whom the claims are generated.</param>
        /// <returns>A list of claims.</returns>
        private List<Claim> CreateClaims(IdentityUser user)
        {
            try
            {
                return new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email)
                };
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Creates signing credentials using a symmetric security key.
        /// </summary>
        /// <returns>Signing credentials for creating the JWT token.</returns>
        private SigningCredentials CreateSigningCredentials()
        {
            return new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("RescuedPawsAuth")), SecurityAlgorithms.HmacSha256);
        }
    }
}
