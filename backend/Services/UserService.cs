namespace vszk.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
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
    }
}