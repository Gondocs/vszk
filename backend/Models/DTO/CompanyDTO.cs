namespace vszk.Models.DTO
{
    public class CompanyDTO
    {
        public int CompanyID { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }
        
        public string Phone { get; set; }
        
        public string Website { get; set; }
        
        public string Logo_link { get; set; }
        
        public string Email { get; set; }

        public List<SoftwareSmallDTO> Softwares { get; set; }
    }
}