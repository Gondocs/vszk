namespace vszk.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        
        public CategoryService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Category.Include(x => x.CategoryGroup).ToListAsync();
        }

        public async Task<List<CategoryDTO>> GetCategoriesFunctions()
        {
            var categories = await _context.Category
                .Include(x => x.CategoryGroup)
                .ToListAsync();

            var categoryDTO = categories.Select(category => new CategoryDTO
            {
                CategoryID = category.CategoryID,
                Name = category.Name,
                Category_group = category.CategoryGroup.Name,
                Func_list = _context.CatFuncConnect.Include(x => x.Category).Include(x => x.Functionality).Where(x => x.Category.CategoryID == category.CategoryID).Select(x => x.Functionality.Funct).ToList(),
            }).ToList();

            return categoryDTO;
        }

        public async Task<List<CategoryGroup>> GetAllCategoryGroups()
        {
            return await _context.CategoryGroup.ToListAsync();
        }

        public async Task<List<SmallCategoryDTO>> GetAllSmallCategories()
        {
            return await _context.Category.Select(x => new SmallCategoryDTO
            {
                CategoryID = x.CategoryID,
                Name = x.Name
            }).ToListAsync();
        }

        public async Task<Category> AddCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }
    }
}