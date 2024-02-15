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
    }
}