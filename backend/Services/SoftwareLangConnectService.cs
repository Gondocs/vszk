namespace vszk.Services
{
    public class SoftwareLangConnectService : ISoftwareLangConnectService
    {
        private readonly DataContext _context;
        
        public SoftwareLangConnectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetSoftwareLanguages()
        {
            return await _context.SoftwareLangConnect.Include(x => x.Language).Select(x => x.Language.Lang).Distinct().ToListAsync();;
        }
    }
}