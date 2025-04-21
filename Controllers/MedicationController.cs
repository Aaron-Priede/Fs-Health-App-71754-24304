using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleApi.Data;
using SimpleApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<MedicationController> _logger;

        public MedicationController(AppDbContext context, ILogger<MedicationController> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // GET: api/Medication
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medication>>> GetMedications()
        {
            _logger.LogInformation("Retrieving all medications");
            return await _context.Medications.ToListAsync();
        }

        // GET: api/Medication/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Medication>> GetMedicationById(int id)
        {
            _logger.LogInformation("Retrieving medication with ID: {MedicationId}", id);
            
            var medication = await _context.Medications.FindAsync(id);

            if (medication == null)
            {
                _logger.LogWarning("Medication with ID: {MedicationId} not found", id);
                return NotFound($"Medication with ID {id} not found.");
            }

            return medication;
        }

        // POST: api/Medication
        [HttpPost]
        public async Task<ActionResult<Medication>> CreateMedication(Medication medication)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid medication model submitted");
                return BadRequest(ModelState);
            }

            try
            {
                _context.Medications.Add(medication);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Created new medication with ID: {MedicationId}", medication.Id);
                return CreatedAtAction(nameof(GetMedicationById), new { id = medication.Id }, medication);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating medication");
                return StatusCode(500, "An error occurred while creating the medication.");
            }
        }

        // PUT: api/Medication/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMedication(int id, Medication medication)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid medication model submitted for update");
                return BadRequest(ModelState);
            }

            if (id != medication.Id)
            {
                _logger.LogWarning("Medication ID mismatch. Route ID: {RouteId}, Entity ID: {EntityId}", id, medication.Id);
                return BadRequest("Medication ID in the URL does not match the ID in the request body.");
            }

            _context.Entry(medication).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated medication with ID: {MedicationId}", id);
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!await MedicationExistsAsync(id))
                {
                    _logger.LogWarning("Failed to update. Medication with ID: {MedicationId} not found", id);
                    return NotFound($"Medication with ID {id} not found.");
                }
                
                _logger.LogError(ex, "Concurrency error while updating medication with ID: {MedicationId}", id);
                return StatusCode(500, "A concurrency error occurred while updating the medication.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating medication with ID: {MedicationId}", id);
                return StatusCode(500, "An error occurred while updating the medication.");
            }
        }

        // DELETE: api/Medication/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedication(int id)
        {
            try
            {
                var medication = await _context.Medications.FindAsync(id);

                if (medication == null)
                {
                    _logger.LogWarning("Failed to delete. Medication with ID: {MedicationId} not found", id);
                    return NotFound($"Medication with ID {id} not found.");
                }

                _context.Medications.Remove(medication);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Deleted medication with ID: {MedicationId}", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting medication with ID: {MedicationId}", id);
                return StatusCode(500, "An error occurred while deleting the medication.");
            }
        }

        private async Task<bool> MedicationExistsAsync(int id)
        {
            return await _context.Medications.AnyAsync(e => e.Id == id);
        }
    }
}