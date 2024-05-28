namespace vszk.Services
{
    public interface ISoftwareFunctionService
    {
        Task<List<string>> GetSoftwaresFunctions();
    }
}