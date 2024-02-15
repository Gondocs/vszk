namespace vszk.Services
{
    public interface ICatFuncConnectService
    {
        Task<List<CatFuncConnect>> GetCategoryFunctions();
    }
}