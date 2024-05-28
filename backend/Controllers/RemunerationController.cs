namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RemunerationController : ControllerBase
    {
        private readonly IRemunerationService _remunerationService;

        public RemunerationController(IRemunerationService remunerationService)
        {
            _remunerationService = remunerationService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Remuneration>>> Get()
        {
            return await _remunerationService.GetSoftwareLevels();
        }

        [HttpGet("GetAllLevels")]
        public async Task<ActionResult<List<string>>> GetAllLevels()
        {
            return await _remunerationService.GetAllLevels();
        }

        [HttpGet("GetAllTypes")]
        public async Task<ActionResult<List<string>>> GetAllTypes()
        {
            return await _remunerationService.GetAllTypes();
        }
    }
}