namespace vszk.Services
{
    public class SoftwareCompConnectService : ISoftwareCompConnectService
    {
        private readonly DataContext _context;
        
        public SoftwareCompConnectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetSoftwareCompatibility()
        {
            return await _context.SoftwareCompConnect.Include(x => x.Compatibility).Select(x => x.Compatibility.Device).Distinct().ToListAsync();
        }
    }
}