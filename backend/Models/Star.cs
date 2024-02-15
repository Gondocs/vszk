namespace vszk.Models
{
    public class Star
    {
        [Key]
        [ForeignKey("Star")]
        public int StarID { get; set; }

        [Range(1, 5)]
        public float? All { get; set; }
        
        [Range(1, 5)]
        public float? Simplicity { get; set; }
        
        [Range(1, 5)]
        public float? Service { get; set; }
        
        [Range(1, 5)]
        public float? Characteristic { get; set; }
        
        [Range(1, 5)]
        public float? Price_value { get; set; }
        
        [Range(0, 10)]
        public int? Recommendation { get; set; }
    }
}