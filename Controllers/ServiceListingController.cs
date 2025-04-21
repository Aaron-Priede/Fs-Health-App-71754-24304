using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleApi.Data;
using SimpleApi.Models;

namespace SimpleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceListingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceListingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceListing
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceListing>>> GetListings()
        {
            return await _context.ServiceListings.ToListAsync();
        }

        // GET: api/ServiceListing/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceListing>> GetListingById(int id)
        {
            var listing = await _context.ServiceListings.FindAsync(id);

            if (listing == null)
            {
                return NotFound("Listing not found.");
            }

            return listing;
        }

        // POST: api/ServiceListing
        [HttpPost]
        public async Task<ActionResult<ServiceListing>> CreateListing(ServiceListing serviceListing)
        {
            _context.ServiceListings.Add(serviceListing);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetListings), new { id = serviceListing.Id }, serviceListing);
        }

        // PUT: api/ServiceListing/{id}
       [HttpPut("{id}")]
public async Task<ActionResult<ServiceListing>> UpdateListing(int id, ServiceListing serviceListing)
{
    if (id != serviceListing.Id)
    {
        return BadRequest("Listing ID mismatch.");
    }

    _context.Entry(serviceListing).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!ListingExists(id))
        {
            return NotFound("Listing not found.");
        }
        else
        {
            throw;
        }
    }

    // Retrieve the updated object
    var updatedListing = await _context.ServiceListings.FindAsync(id);

    return Ok(updatedListing); // Return the updated object
}
        // DELETE: api/ServiceListing/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var listing = await _context.ServiceListings.FindAsync(id);

            if (listing == null)
            {
                return NotFound("Listing not found.");
            }

            _context.ServiceListings.Remove(listing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/ServiceListing/{id}/update-availability
        [HttpPost("{id}/update-availability")]
        public async Task<IActionResult> UpdateAvailability(int id)
        {
            var listing = await _context.ServiceListings.FindAsync(id);

            if (listing == null)
            {
                return NotFound("Listing not found.");
            }

            listing.Availability = false;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Availability updated to False.", listingId = listing.Id });
        }

        // GET: api/ServiceListing/search?name={name}
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ServiceListing>>> SearchListings([FromQuery] string name)
        {
            var listings = await _context.ServiceListings
                .Where(l => l.Name.Contains(name))
                .ToListAsync();

            return listings;
        }

        private bool ListingExists(int id)
        {
            return _context.ServiceListings.Any(e => e.Id == id);
        }
    }
}