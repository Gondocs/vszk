namespace vszk.Models.DTO
{
    public class UserFavoriteSoftwareListDTO
    {
        public int SoftwareID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Category Category { get; set; }

        public Company Company { get; set; }

        public int? Introduction_fee { get; set; }

        public string Logo_link { get; set; }

        public float Average_stars { get; set; }

    }
}