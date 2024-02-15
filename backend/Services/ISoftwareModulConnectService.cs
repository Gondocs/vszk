namespace vszk.Services
{
    public interface ISoftwareModulConnectService
    {
        Task<List<SoftwareModulConnect>> GetSoftwareModuls();
    }
}