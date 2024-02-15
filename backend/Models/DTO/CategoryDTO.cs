namespace vszk.Models.DTO
{
    public class CategoryDTO
    {
        public int CategoryID { get; set; }

        public string Name { get; set; }

        public string Category_group { get; set; }

        public List<string> Func_list { get; set; }
    }
}