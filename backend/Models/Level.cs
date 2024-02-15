namespace vszk.Models
{
    public class Level
    {
        [Key]
        [ForeignKey("Level")]
        public int LevelID { get; set; }
        
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
    }
}