namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoftwareOSConnectController : ControllerBase
    {
        private readonly ISoftwareOSConnectService _softwareOSConnectService;

        public SoftwareOSConnectController(ISoftwareOSConnectService softwareOSConnectService)
        {
            _softwareOSConnectService = softwareOSConnectService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<string>>> Get()
        {
            return await _softwareOSConnectService.GetSoftwareOS();
        }
    }
}