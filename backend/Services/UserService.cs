namespace vszk.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;

        public UserService(DataContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.User.ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.User.FindAsync(id);
        }

        public async Task<User> UpdateUserSettlement(UserSettlementDTO userSettlementDTO)
        {
            var user = await _context.User.FindAsync(userSettlementDTO.UserID);
            if (user == null)
            {
                return null;
            }

            user.Country = userSettlementDTO.Country;
            user.Settlement = userSettlementDTO.Settlement;

            _context.User.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserData(UserDataChangeDTO userDataChangeDTO)
        {
            var user = await _context.User.FindAsync(userDataChangeDTO.UserID);
            if (user == null)
            {
                return null;
            }
        
            var existingUserWithSameEmail = await _context.User
                .Where(u => u.Email == userDataChangeDTO.Email && u.UserID != userDataChangeDTO.UserID)
                .FirstOrDefaultAsync();
        
            if (existingUserWithSameEmail != null)
            {
                throw new Exception("Email already in use by another user.");
            }
        
            user.Firstname = userDataChangeDTO.FirstName;
            user.Lastname = userDataChangeDTO.LastName;
            user.Email = userDataChangeDTO.Email;
            user.Country = userDataChangeDTO.Country;
            user.Settlement = userDataChangeDTO.Settlement;
        
            _context.User.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.User.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> UpdateUserDataAdmin(UserDataChangeAdmin userDataChangeAdmin)
        {
            var user = await _context.User.FindAsync(userDataChangeAdmin.UserID);
            if (user == null)
            {
                return null;
            }

            var existingUserWithSameEmail = await _context.User
                .Where(u => u.Email == userDataChangeAdmin.Email && u.UserID != userDataChangeAdmin.UserID)
                .FirstOrDefaultAsync();

            if (existingUserWithSameEmail != null)
            {
                throw new Exception("Email already in use by another user.");
            }

            user.Firstname = userDataChangeAdmin.FirstName;
            user.Lastname = userDataChangeAdmin.LastName;
            user.Email = userDataChangeAdmin.Email;
            user.Country = userDataChangeAdmin.Country;
            user.Settlement = userDataChangeAdmin.Settlement;
            user.Role = userDataChangeAdmin.Role;

            _context.User.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task SendWeeklyNewsletter(string subject, string message)
        {
            var users = await _context.User.ToListAsync();
            foreach (var user in users)
            {
                await _emailService.SendEmailAsync(user.Email, subject, message);
            }
        }

        public async Task SendEmailToAllUsers(string subject, string message)
        {
            var users = await _context.User.ToListAsync();
            foreach (var user in users)
            {
                await _emailService.SendEmailAsync(user.Email, subject, message);
            }
        }

    }
}
