namespace vszk.Services
{
    public class RemunerationService : IRemunerationService
    {
        private readonly DataContext _context;
        
        public RemunerationService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Remuneration>> GetSoftwareLevels()
        {
            return await _context.Remuneration.Include(x => x.Software).Include(x => x.Level).ToListAsync();
        }
    }
}