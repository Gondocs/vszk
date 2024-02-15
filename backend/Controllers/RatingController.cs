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

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeRating(int id, [FromBody] RatingChangeDTO rate)
        {
            return Ok(await _ratingService.ChangeFeedBack(id, rate));
        }
    }
}