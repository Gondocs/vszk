namespace vszk.Services
{
    public class SoftwareModulConnectService : ISoftwareModulConnectService
    {
        private readonly DataContext _context;
        
        public SoftwareModulConnectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<SoftwareModulConnect>> GetSoftwareModuls()
        {
            return await _context.SoftwareModulConnect.Include(x => x.Software).Include(x => x.Modul).ToListAsync();
        }
    }
}