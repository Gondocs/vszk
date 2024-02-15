namespace vszk.Models
{
    public class PasswordChange
    {
        public int UserID { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}