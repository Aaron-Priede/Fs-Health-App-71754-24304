using Bogus;
using SimpleApi.Data;
using SimpleApi.Models;

public class DatabaseSeeder
{
    private readonly AppDbContext _context;

    public DatabaseSeeder(AppDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        // Seed UserProfiles table
        if (!_context.UserProfiles.Any())
        {
            var userFaker = new Faker<UserProfile>()
                .RuleFor(u => u.Name, f => f.Name.FullName())
                .RuleFor(u => u.Email, f => f.Internet.Email())
                .RuleFor(u => u.Password, f => f.Internet.Password())
                .RuleFor(u => u.Username, f => f.Internet.UserName())
                .RuleFor(u => u.ServiceProvider, f => f.Random.Bool());

            var fakeUsers = userFaker.Generate(50); // Generate 50 fake users
            _context.UserProfiles.AddRange(fakeUsers);
        }

        // Seed Medications table
        
            var medicationFaker = new Faker<Medication>()
                .RuleFor(m => m.MedicationName, f => f.Commerce.ProductName())
                .RuleFor(m => m.Dosage, f => $"{f.Random.Number(1, 500)} mg")
                .RuleFor(m => m.Instruction, f => f.Lorem.Sentence())
                .RuleFor(m => m.IssueDate, f => f.Date.Past().ToShortDateString())
                .RuleFor(m => m.ExpiryDate, f => f.Date.Future().ToShortDateString())
                .RuleFor(m => m.DoctorName, f => f.Internet.Email())
                .RuleFor(m => m.PatientName, f => f.Internet.Email())
                .RuleFor(m => m.Status, f => f.Random.Bool() ? "Active" : "Inactive");

            var fakeMedications = medicationFaker.Generate(150); // Generate 30 fake medications
            _context.Medications.AddRange(fakeMedications);
      

   
            var serviceFaker = new Faker<ServiceListing>()
                .RuleFor(s => s.Name, f => f.Internet.Email())
                .RuleFor(s => s.Description, f => f.Lorem.Paragraph())
                .RuleFor(s => s.Location, f => f.Address.City())
                .RuleFor(s => s.Contact, f => f.Phone.PhoneNumber())
                .RuleFor(s => s.Timing, f => $"{f.Date.Past().ToShortTimeString()} - {f.Date.Future().ToShortTimeString()}")
                .RuleFor(s => s.Charges, f => f.Random.Decimal(50, 500))
                .RuleFor(s => s.Availability, f => f.Random.Bool())
                .RuleFor(s => s.Booking, f => f.Random.Bool())
                .RuleFor(s => s.Confirmation, f => f.Random.Bool())
                .RuleFor(s => s.Customer, f => f.Internet.Email());

            var fakeServices = serviceFaker.Generate(150); // Generate 20 fake service listings
            _context.ServiceListings.AddRange(fakeServices);
      

        // Save changes to the database
        await _context.SaveChangesAsync();
    }
}