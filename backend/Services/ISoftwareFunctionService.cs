namespace vszk.Services
{
    public interface ISoftwareFunctionService
    {
        Task<List<SoftwareFunction>> GetSoftwaresFunctions();
    }
}