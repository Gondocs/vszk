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

        [HttpPost("AddUserFavoriteSoftware")]
        public async Task<IActionResult> AddUserFavoriteSoftware([FromBody] UserFavoriteSoftwareDTO userFavoriteSoftwareDTO)
        {
            try
            {
                var user = await _softwareService.AddUserFavoriteSoftware(userFavoriteSoftwareDTO);
                if (user == null)
                {
                    return NotFound();
                }
                return new ContentResult { Content = "Success, added to favorites", StatusCode = 200 };
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("GetUserFavoriteSoftware")]
        public async Task<ActionResult<List<UserFavoriteSoftwareListDTO>>> GetUserFavoriteSoftware(int id)
        {
            var software = await _softwareService.GetUserFavoriteSoftware(id);
            if (software == null)
            {
                return NotFound();
            }
            return software;
        }

        [HttpDelete("RemoveUserFavoriteSoftware")]
        public async Task<ActionResult<User>> RemoveUserFavoriteSoftware(
            [FromBody] UserFavoriteSoftwareDTO userFavoriteSoftwareDTO
        )
        {
            var user = await _softwareService.RemoveUserFavoriteSoftware(userFavoriteSoftwareDTO);
            if (user == null)
            {
                return NotFound();
            }
            return new ContentResult
            {
                Content = "Success, removed from favorites",
                StatusCode = 200
            };
        }

        [HttpGet("IsUserFavoriteSoftwareById")]
        public async Task<ActionResult<bool>> IsUserFavoriteSoftwareById(int userId, int softwareId)
        {
            return await _softwareService.IsUserFavoriteSoftwareById(userId, softwareId);
        }

        [HttpGet("RecommendedSoftwares")]
        public async Task<ActionResult<List<SoftwareSmallDTO>>> GetRecommendedSoftwares(int id)
        {
            var software = await _softwareService.GetRecommendedSoftwares(id);
            if (software == null)
            {
                return NotFound();
            }
            return software;
        }

        [HttpPost("AddSoftware")]
        public async Task<ActionResult<SoftwareDTO>> AddSoftware([FromBody] SoftwareDTO softwareDTO)
        {
            var software = await _softwareService.AddSoftware(softwareDTO);
            if (software == null)
            {
                return NotFound();
            }
            return softwareDTO;
        }

        [HttpGet("GetAllFunctions")]
        public async Task<ActionResult<List<SoftwareFunctionsDTO>>> GetAllFunctions()
        {
            return await _softwareService.GetAllFunctions();
        }

        [HttpGet("GetAllRemunerations")]
        public async Task<ActionResult<List<RemunerationDTO>>>
            GetAllRemunerations()
        {
            return await _softwareService.GetAllRemunerations();
        }

        [HttpGet("GetAllModuls")]
        public async Task<ActionResult<List<SoftwareModulsDTO>>>
            GetAllModuls()
        {
            return await _softwareService.GetAllModuls();
        }

        [HttpPost("AddNewSoftware")]
        public async Task<ActionResult<List<SoftwareDTO>>> AddNewSoftware(
            [FromBody] SoftwareDTO softwareDTO
        )
        {
            var software = await _softwareService.AddNewSoftware(softwareDTO);
            if (software == null)
            {
                return NotFound();
            }
            return software;
        }

        [HttpDelete("DeleteSoftwareById")]
        public async Task<ActionResult<List<SoftwareDTO>>> DeleteSoftwareById(int id)
        {
            var software = await _softwareService.DeleteSoftwareById(id);
            if (software == null)
            {
                return NotFound();
            }
            return software;
        }

        [HttpPost("GetSoftwaresByIDs")]
        public async Task<ActionResult<List<SoftwareDTO>>> GetSoftwaresByIDs([FromBody] List<int> ids)
        {
            var software = await _softwareService.GetSoftwaresByIDs(ids);
            if (software == null || !software.Any())
            {
                return NotFound();
            }
            return Ok(software);
        }

    }
}
