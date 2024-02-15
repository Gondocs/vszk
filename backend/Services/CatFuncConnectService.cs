namespace vszk.Services
{
    public class CatFuncConnectService : ICatFuncConnectService
    {
        private readonly DataContext _context;

        public CatFuncConnectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<CatFuncConnect>> GetCategoryFunctions()
        {
            return await _context.CatFuncConnect.Include(x => x.Category).Include(x => x.Functionality).ToListAsync();
        }
    }
}