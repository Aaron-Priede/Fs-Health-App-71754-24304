using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleApi.Data;
using SimpleApi.Models;

namespace SimpleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserProfileController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UserProfile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserProfile>>> GetUsers()
        {
            return await _context.UserProfiles.ToListAsync();
        }

        // GET: api/UserProfile/{email}/{password}
        [HttpGet("{email}/{password}")]
        public async Task<ActionResult<UserProfile>> Authenticate(string email, string password)
        {
            var user = await _context.UserProfiles
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return user;
        }

        // POST: api/UserProfile
        [HttpPost]
        public async Task<ActionResult<UserProfile>> CreateUser(UserProfile userProfile)
        {
            // Add the new user to the database
            _context.UserProfiles.Add(userProfile);
            await _context.SaveChangesAsync();

            // Return the created user with a 201 Created status
            return CreatedAtAction(nameof(GetUsers), new { id = userProfile.Id }, userProfile);
        }

        // PUT: api/UserProfile/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest("User ID mismatch.");
            }

            // Update the user in the database
            _context.Entry(userProfile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound("User not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Return 204 No Content on success
        }

        [HttpGet("search")]
public async Task<ActionResult<string>> SearchByEmailAndPassword([FromQuery] string email, [FromQuery] string password)
{
    var user = await _context.UserProfiles
        .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

    if (user == null)
    {
        return NotFound("User not found.");
    }

    return Ok(user); // Return the completet object
}
        private bool UserExists(int id)
        {
            return _context.UserProfiles.Any(e => e.Id == id);
        }
    }
}