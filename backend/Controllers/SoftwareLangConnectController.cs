namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoftwareLangConnectController : ControllerBase
    {
        private readonly ISoftwareLangConnectService _softwareLangConnectService;

        public SoftwareLangConnectController(ISoftwareLangConnectService softwareLangConnectService)
        {
            _softwareLangConnectService = softwareLangConnectService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<string>>> Get()
        {
            return await _softwareLangConnectService.GetSoftwareLanguages();
        }
    }
}