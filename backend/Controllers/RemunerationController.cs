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
    }
}