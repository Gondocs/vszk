namespace vszk.Services
{
    public class SoftwareModulConnectService : ISoftwareModulConnectService
    {
        private readonly DataContext _context;

        public SoftwareModulConnectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetSoftwareModuls()
        {
            return await _context.SoftwareModulConnect.Include(x => x.Modul).Select(x => x.Modul.Name).Distinct().ToListAsync();
        }
    }
}