namespace vszk.Models
{
    public class Compatibility
    {
        [Key]
        [ForeignKey("Compatibility")]
        public int CompatibilityID { get; set; }
        
        [Required]
        [StringLength(32)]
        public string Device { get; set; }           
    }
}