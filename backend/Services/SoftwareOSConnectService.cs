namespace vszk.Services
{
    public class SoftwareOSConnectService : ISoftwareOSConnectService
    {
        private readonly DataContext _context;
        
        public SoftwareOSConnectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetSoftwareOS()
        {
            return await _context.SoftwareOSConnect.Include(x => x.OS).Select(x => x.OS.Os).Distinct().ToListAsync();
        }
    }
}