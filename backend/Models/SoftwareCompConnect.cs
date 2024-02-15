namespace vszk.Models
{
    public class SoftwareCompConnect
    {
        [Key]
        [ForeignKey("SoftwareCompConnect")]
        public int SoftwareCompConnectID { get; set; }
        
        [Required]
        public Compatibility Compatibility { get; set; }       
        
        [Required]
        public Software Software { get; set; }    
    }
}