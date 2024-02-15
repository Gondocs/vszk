namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Category>>> Get()
        {
            return await _categoryService.GetAllCategories();
        }

        [HttpGet("GetAllWithFunctions")]
        public async Task<ActionResult<List<CategoryDTO>>> GetCategoriesFunctions()
        {
            return await _categoryService.GetCategoriesFunctions();
        }
    }
}