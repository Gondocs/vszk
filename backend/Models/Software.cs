namespace vszk.Models
{
    public class Software
    {
        [Key]
        [ForeignKey("Software")]
        public int SoftwareID { get; set; }

        [Required]
        [StringLength(64)]
        public string Name { get; set; }

        [StringLength(516)]
        public string Description { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        public Company Company { get; set; }

        public int? Introduction_fee { get; set; }

        [StringLength(128)]
        public string Logo_link { get; set; }
    }
}