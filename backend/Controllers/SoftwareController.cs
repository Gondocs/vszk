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

        [HttpPut("AddUserFavoriteSoftware")]
        public async Task<ActionResult<User>> AddUserFavoriteSoftware([FromBody] UserFavoriteSoftwareDTO userFavoriteSoftwareDTO)
        {
            var user = await _softwareService.AddUserFavoriteSoftware(userFavoriteSoftwareDTO);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpGet("GetUserFavoriteSoftware")]
        public async Task<ActionResult<List<SoftwareSmallDTO>>> GetUserFavoriteSoftware(int id)
        {
            var software = await _softwareService.GetUserFavoriteSoftware(id);
            if (software == null)
            {
                return NotFound();
            }
            return software;
        }

        [HttpPut("RemoveUserFavoriteSoftware")]
        public async Task<ActionResult<User>> RemoveUserFavoriteSoftware([FromBody] UserFavoriteSoftwareDTO userFavoriteSoftwareDTO)
        {
            var user = await _softwareService.RemoveUserFavoriteSoftware(userFavoriteSoftwareDTO);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
    }
}