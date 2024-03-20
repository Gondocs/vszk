namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<User>>> Get()
        {
            return await _userService.GetAllUsers();
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<UserByIdDTO>> GetById(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return new UserByIdDTO
            {
                Email = user.Email,
                FirstName = user.Firstname,
                LastName = user.Lastname,
                Role = user.Role,
                Country = user.Country,
                Settlement = user.Settlement
            };


        }

        [HttpPut("UpdateUserSettlement")]
        public async Task<ActionResult<User>> UpdateUserSettlement([FromBody] UserSettlementDTO userSettlementDTO)
        {
            var user = await _userService.UpdateUserSettlement(userSettlementDTO);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
    }
}