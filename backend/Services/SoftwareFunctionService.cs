namespace vszk.Services
{
    public class SoftwareFunctionService : ISoftwareFunctionService
    {
        private readonly DataContext _context;

        public SoftwareFunctionService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetSoftwaresFunctions()
        {
            return await _context.SoftwareFunction.Include(x => x.Functionality).Select(x => x.Functionality.Funct).Distinct().ToListAsync();
        }
    }
}