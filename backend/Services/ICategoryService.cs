namespace vszk.Services
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategories();

        Task<List<CategoryDTO>> GetCategoriesFunctions();
    }
}