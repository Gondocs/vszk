namespace vszk.Services
{
    public interface ISoftwareModulConnectService
    {
        Task<List<string>> GetSoftwareModuls();
    }
}