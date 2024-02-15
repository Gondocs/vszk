namespace vszk.Models
{
    public class Support
    {
        [Key]
        [ForeignKey("Support")]
        public int SupportID { get; set; }
        
        [Required]
        public Language Language { get; set; }       
        
        [Required]
        public Software Software { get; set; } 
        
    }
}