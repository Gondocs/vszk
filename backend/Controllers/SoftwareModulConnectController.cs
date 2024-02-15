namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoftwareModulConnectController : ControllerBase
    {
        private readonly ISoftwareModulConnectService _softwareModulConnectService;

        public SoftwareModulConnectController(ISoftwareModulConnectService softwareModulConnectService)
        {
            _softwareModulConnectService = softwareModulConnectService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<SoftwareModulConnect>>> Get()
        {
            return await _softwareModulConnectService.GetSoftwareModuls();
        }
    }
}