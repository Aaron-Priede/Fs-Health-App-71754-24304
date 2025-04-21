namespace SimpleApi.Models
{
    public class ServiceListing
    {
        public int Id { get; set; } // Primary Key
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Contact { get; set; }
        public string Timing { get; set; }
        public decimal Charges { get; set; }
        public bool? Availability { get; set; }
        public bool? Booking { get; set; }
        public string? Customer { get; set; }
        public bool? Confirmation { get; set; }

    }
}