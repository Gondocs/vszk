namespace vszk.Models
{
    public class Remuneration
    {
        [Key]
        [ForeignKey("Remuneration")]
        public int RemunerationID { get; set; }

        [Required]
        public Software Software { get; set; }

        [Required]
        public Level Level { get; set; }

        [Required]
        [StringLength(32)]
        public string Type { get; set; }
        
        public int? Price { get; set; }
    }
}