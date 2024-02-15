namespace vszk.Services
{
    public interface ISoftwareCompConnectService
    {
        Task<List<string>> GetSoftwareCompatibility();
    }
}