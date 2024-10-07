namespace vszk.Services
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategories();

        Task<List<CategoryDTO>> GetCategoriesFunctions();

        Task<List<CategoryGroup>> GetAllCategoryGroups();

        Task<List<SmallCategoryDTO>> GetAllSmallCategories();
    }
}