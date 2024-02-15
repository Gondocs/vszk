namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupportController : ControllerBase
    {
        private readonly ISupportService _supportService;

        public SupportController(ISupportService supportService)
        {
            _supportService = supportService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<string>>> Get()
        {
            return await _supportService.GetSupports();
        }
    }
}