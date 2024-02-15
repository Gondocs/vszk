namespace vszk.Models
{
    public class SoftwareModulConnect
    {
        [Key]
        [ForeignKey("SoftwareModulConnect")]
        public int SoftwareModulConnectID { get; set; }

        [Required]
        public Modul Modul { get; set; }

        [Required]
        public Software Software { get; set; }      
    }
}