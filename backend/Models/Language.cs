namespace vszk.Models
{
    public class Language
    {
        [Key]
        [ForeignKey("Language")]
        public int LanguageID { get; set; }
        
        [Required]
        [StringLength(32)]
        public string Lang { get; set; }        
    }
}