namespace SimpleApi.Models
{
    public class UserProfile
    {
        public int Id { get; set; } // Primary Key
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public string Username { get; set; }
        public bool ServiceProvider { get; set; }
    }
}