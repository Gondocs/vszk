namespace vszk.Models
{
    public class Functionality
    {
        [Key]
        [ForeignKey("Functionality")]
        public int FunctionalityID { get; set; }
        
        [Required]
        [StringLength(64)]
        public string Funct { get; set; }
    }
}