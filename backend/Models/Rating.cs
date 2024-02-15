namespace vszk.Models
{
    public class Rating
    {
        [Key]
        [ForeignKey("Rating")]
        public int RatingID { get; set; }
        
        [Required]
        [Column(TypeName = "datetime")]
        public DateTime Datumido { get; set; }
        
        [Required]
        public User User { get; set; }
        
        [Required]
        public Software Software { get; set; }
        
        [Required]
        public Star Star { get; set; }
        
        [Required]
        public TextRating TextRating { get; set; }
    }
}