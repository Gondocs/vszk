namespace vszk.Models
{
    public class SoftwareFunction
    {
        [Key]
        [ForeignKey("SoftwareFunction")]
        public int SoftwareFunctionID { get; set; }
        
        [Required]
        public bool Sfunction { get; set; }

        [Required]
        public Software Software { get; set; }

        [Required]
        public Functionality Functionality { get; set; }
        
    }
}