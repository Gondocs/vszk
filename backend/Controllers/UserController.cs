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
        public async Task<ActionResult<List<AdminUserDataChangeDTO>>> Get()
        {
            var users = await _userService.GetAllUsers();
            var adminUsers = users
                .Select(user => new AdminUserDataChangeDTO
                {
                    UserID = user.UserID,
                    Email = user.Email,
                    FirstName = user.Firstname,
                    Role = user.Role,
                    LastName = user.Lastname,
                    Country = user.Country,
                    Settlement = user.Settlement
                })
                .ToList();

            return Ok(adminUsers);
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
                UserID = user.UserID,
                Email = user.Email,
                FirstName = user.Firstname,
                LastName = user.Lastname,
                Country = user.Country,
                Settlement = user.Settlement
            };
        }

        [HttpPut("UpdateUserSettlement")]
        public async Task<ActionResult<User>> UpdateUserSettlement(
            [FromBody] UserSettlementDTO userSettlementDTO
        )
        {
            var user = await _userService.UpdateUserSettlement(userSettlementDTO);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPut("UpdateUserData")]
        public async Task<ActionResult<User>> UpdateUserData(
            [FromBody] UserDataChangeDTO userDataChangeDTO
        )
        {
            var user = await _userService.UpdateUserData(userDataChangeDTO);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPut("UpdateUserDataAdmin")]
        public async Task<ActionResult<User>> UpdateUserDataAdmin(
            [FromBody] UserDataChangeAdmin userDataChangeAdmin
        )
        {
            var user = await _userService.UpdateUserDataAdmin(userDataChangeAdmin);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpGet("GetUserDataByEmail")]
        public async Task<ActionResult<AdminUserDataChangeDTO>> GetUserDataByEmail(string email)
        {
            var user = await _userService.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound();
            }
            return new AdminUserDataChangeDTO
            {
                UserID = user.UserID,
                Email = user.Email,
                FirstName = user.Firstname,
                Role = user.Role,
                LastName = user.Lastname,
                Country = user.Country,
                Settlement = user.Settlement
            };
        }

        [HttpDelete("DeleteUser")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _userService.DeleteUser(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost("SendEmailToAllUsers")]
        public async Task<IActionResult> SendEmailToAllUsers([FromBody] EmailDTO emailDTO)
        {
            await _userService.SendEmailToAllUsers(emailDTO.Subject, emailDTO.Message);
            return Ok();
        }
    }
}
