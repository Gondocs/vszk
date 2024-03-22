namespace vszk.Models
{
    public class UserSoftwareFavorites
    {
        [Key]
        [ForeignKey("UserSoftwareFavorites")]
        public int UserSoftwareFavoritesID { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        public Software Software { get; set; }
    }  
}