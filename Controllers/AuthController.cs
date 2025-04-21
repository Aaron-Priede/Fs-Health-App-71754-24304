using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using SimpleApi.Models;
using SimpleApi.Data; // Include your DbContext namespace

namespace SimpleApi.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Inject AppDbContext via constructor
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = "/auth/google-callback", // Ensure this matches your Google Console redirect URI
                Items =
                {
                    { "returnUrl", "/servicelisting" }
                }
            };

            return Challenge(properties, "Google");
        }


        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync("Google");

            if (!result.Succeeded || result.Principal == null)
            {
                return BadRequest("Authentication failed");
            }

            // Retrieve user claims
            var claims = result.Principal.Claims;
            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var name = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

            // Handle null values for email or name
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(name))
            {
                return BadRequest("Unable to retrieve user information from Google.");
            }

            // Check if the user already exists in the database
            var existingUser = _context.UserProfiles.FirstOrDefault(u => u.Email == email);
            UserProfile currentUser;

            if (existingUser == null)
            {
                // Create new user if doesn't exist
                currentUser = new UserProfile
                {
                    Name = name,
                    Email = email,
                    Username = email.Split('@')[0],
                    ServiceProvider = false
                };

                _context.UserProfiles.Add(currentUser);
                await _context.SaveChangesAsync();
            }
            else
            {
                // Use existing user
                currentUser = existingUser;
            }

            // Now use currentUser which is guaranteed to be non-null
            var frontendUrl = "http://localhost:5173/auth-success";
            var queryParams = $"?email={Uri.EscapeDataString(email)}&name={Uri.EscapeDataString(name)}&isServiceProvider={currentUser.ServiceProvider}";

            return Redirect(frontendUrl + queryParams);
        }
    }
}