namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }
        
        [HttpPost]
        public async Task<IActionResult> NewRating([FromBody] RatingDTO rate)
        {
            return Ok(await _ratingService.PostFeedBack(rate));
        }



        [HttpDelete("RemoveRatingByUserIdAndSoftwareId/{userId}/{softwareId}")]
        public async Task<IActionResult> RemoveRatingByUserIdAndSoftwareId(int userId, int softwareId)
        {
            return Ok(await _ratingService.DeleteFeedBack(userId, softwareId));
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAllRatings()
        {
            return Ok(await _ratingService.GetAllRatings());
        }

        [HttpGet("GetRatingByUserIdAndSoftwareId/{userId}/{softwareId}")]
        public async Task<IActionResult> GetRatingByUserIdAndSoftwareId(int userId, int softwareId)
        {
            return Ok(await _ratingService.GetRatingByUserIdAndSoftwareId(userId, softwareId));
        }

        [HttpPut("PutRatingByUserIdAndSoftwareId/{userId}/{softwareId}")]
        public async Task<IActionResult> PutRatingByUserIdAndSoftwareId(int userId, int softwareId, [FromBody] RatingDTO rate)
        {
            return Ok(await _ratingService.PutRatingByUserIdAndSoftwareId(userId, softwareId, rate));
        }

        [HttpGet("GetRatingBySoftwareId/{softwareId}")]
        public async Task<IActionResult> GetRatingBySoftwareId(int softwareId)
        {
            return Ok(await _ratingService.GetRatingBySoftwareId(softwareId));
        }

    }
}