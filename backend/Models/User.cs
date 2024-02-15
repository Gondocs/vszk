namespace vszk.Models
{
    public class User
    {
        [Key]
        [ForeignKey("User")]
        public int UserID { get; set; }
        
        [Required]
        [StringLength(32)]
        public string Lastname { get; set; }

        [Required]
        [StringLength(32)]
        public string Firstname { get; set; }

        [Required]
        [Column(TypeName = "varchar(64)")]
        public string Email { get; set; }

        [StringLength(32)]
        public string Country { get; set; }
        
        [StringLength(64)]
        public string Settlement { get; set; }
        
        [Required]
        [StringLength(64)]
        public string PasswordHash { get; set; }
    }
}