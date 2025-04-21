namespace SimpleApi.Models
{
    public class Medication
    {
        public int Id { get; set; } // Primary Key
        public string MedicationName { get; set; }
        public string Dosage { get; set; }
        public string Instruction { get; set; }
        public string IssueDate { get; set; } // Changed to string
        public string ExpiryDate { get; set; } // Changed to string
        public string DoctorName { get; set; }
        public string PatientName { get; set; }
        public string Status { get; set; }
    }
}