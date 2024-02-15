namespace vszk.Models
{
    public class SoftwareOSConnect
    {
        [Key]
        [ForeignKey("SoftwareOSConnect")]
        public int SoftwareOSConnectID { get; set; }
        
        [Required]
        public OS OS { get; set; }       
        
        [Required]
        public Software Software { get; set; } 
    }
}