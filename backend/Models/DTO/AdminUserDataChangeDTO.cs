namespace vszk.Models.DTO
{
    public class AdminUserDataChangeDTO
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Role { get; set; }
        public string Email  { get; set; }
        public string Country { get; set; }
        public string Settlement { get; set; }
    }
}
