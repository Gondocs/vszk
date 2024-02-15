namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoftwareController : ControllerBase
    {
        private readonly ISoftwareService _softwareService;

        public SoftwareController(ISoftwareService softwareService)
        {
            _softwareService = softwareService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<SoftwareDTO>>> Get()
        {
            return await _softwareService.GetAllSoftwares();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SoftwareDTO>> GetSingle(int id)
        {
            return await _softwareService.GetSoftwareById(id);
        }

        [HttpGet("GetAllInfos")]
        public async Task<ActionResult<List<SoftwareSmallDTO>>> GetInfos()
        {
            return await _softwareService.GetAllSoftwaresInfos();
        }
    }
}