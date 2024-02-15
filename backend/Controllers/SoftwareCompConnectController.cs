namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoftwareCompConnectController : ControllerBase
    {
        private readonly ISoftwareCompConnectService _softwareCompConnectService;

        public SoftwareCompConnectController(ISoftwareCompConnectService softwareCompConnectService)
        {
            _softwareCompConnectService = softwareCompConnectService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<string>>> Get()
        {
            return await _softwareCompConnectService.GetSoftwareCompatibility();
        }
    }
}