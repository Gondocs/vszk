namespace vszk.Services
{
    public class SupportService : ISupportService
    {
        private readonly DataContext _context;
        
        public SupportService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetSupports()
        {
            return await _context.Support.Include(x => x.Language).Select(x => x.Language.Lang).Distinct().ToListAsync();
        }
    }
}