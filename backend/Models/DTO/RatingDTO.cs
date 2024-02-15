namespace vszk.Models.DTO
{
    public class RatingDTO
    {        
        public int UserID { get; set; }
        
        public int SoftwareID { get; set; }
        
        public float? All_star { get; set; }
        
        public float? Simplicity { get; set; }
        
        public float? Service { get; set; }
        
        public float? Characteristic { get; set; }
        
        public float? Price_value { get; set; }
        
        public int? Recommendation { get; set; }
        
        public string All_text { get; set; }
        
        public string Positive { get; set; }
        
        public string Negative { get; set; }
        
        public string Reason_of_use { get; set; }
        
        public string Duration_of_use { get; set; }
    }
}