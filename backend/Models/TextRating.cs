namespace vszk.Models
{
    public class TextRating
    {      
        [Key]
        [ForeignKey("TextRating")]  
        public int TextRatingID { get; set; }
        
        [Required]
        [StringLength(256)]
        public string All { get; set; }
        
        [StringLength(256)]
        public string Positive { get; set; }
        
        [StringLength(256)]
        public string Negative { get; set; }
        
        [StringLength(256)]
        public string Reason_of_use { get; set; }
        
        [StringLength(32)]
        public string Duration_of_use { get; set; }
    }
}