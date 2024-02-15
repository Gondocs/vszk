namespace vszk.Models
{
    public class Modul
    {
        [Key]
        [ForeignKey("Modul")]
        public int ModulID { get; set; }

        [Required]
        [StringLength(64)]
        public string Name { get; set; }     
    }
}