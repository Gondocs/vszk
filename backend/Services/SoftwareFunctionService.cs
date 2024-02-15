namespace vszk.Services
{
    public class SoftwareFunctionService : ISoftwareFunctionService
    {
        private readonly DataContext _context;
        
        public SoftwareFunctionService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<SoftwareFunction>> GetSoftwaresFunctions()
        {
            return await _context.SoftwareFunction.Include(x => x.Software).Include(x => x.Functionality).ToListAsync();
        }
    }
}