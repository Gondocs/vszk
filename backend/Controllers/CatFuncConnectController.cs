namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatFuncConnectController : ControllerBase
    {
        private readonly ICatFuncConnectService _catFuncConnectService;

        public CatFuncConnectController(ICatFuncConnectService catFuncConnectService)
        {
            _catFuncConnectService = catFuncConnectService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<CatFuncConnect>>> Get()
        {
            return await _catFuncConnectService.GetCategoryFunctions();
        }
    }
}