namespace vszk.Models
{
    public class CategoryGroup
    {
        [Key]
        [ForeignKey("CategoryGroup")]
        public int CategoryGroupID { get; set; }
        
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
    }
}