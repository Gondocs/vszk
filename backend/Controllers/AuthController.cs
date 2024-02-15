using System.Security.Cryptography;

namespace vszk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        private string GenerateJwtToken(User user)
        {
            var key = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(key);
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Email),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        private bool VerifyPassword(string enteredPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                if (_context.User.Any(u => u.Email == model.Email))
                {
                    return BadRequest("Email is already in use.");
                }

                string hashedPassword = HashPassword(model.Password);

                var user = new User
                {
                    Lastname = model.Lastname,
                    Firstname = model.Firstname,
                    PasswordHash = hashedPassword,
                    Email = model.Email
                };

                _context.User.Add(user);
                await _context.SaveChangesAsync();

                return Ok("Registration successful.");
            }

            return BadRequest("Invalid registration data.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _context.User.SingleOrDefault(u => u.Email == model.Email);

                if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
                {
                    return Unauthorized("Invalid email or password.");
                }

                var userDTO = new UserDTO
                {
                    Token = GenerateJwtToken(user),
                    UserID = user.UserID,
                    Email = user.Email,
                    FirstName = user.Firstname,
                    LastName = user.Lastname
                };

                return Ok(userDTO);
            }

            return BadRequest("Invalid login data.");
        }

        [HttpPost("changepassword")]
        public IActionResult ChangePassword([FromBody] PasswordChange pc)
        {
            if (ModelState.IsValid)
            {
                var user = _context.User.SingleOrDefault(u => u.UserID == pc.UserID);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                if (!VerifyPassword(pc.OldPassword, user.PasswordHash))
                {
                    return Unauthorized("Invalid old password.");
                }

                string newPasswordHash = HashPassword(pc.NewPassword);

                user.PasswordHash = newPasswordHash;

                _context.SaveChanges();

                return Ok("Password changed successfully.");
            }

            return BadRequest("Invalid input data.");
        }
    }
}