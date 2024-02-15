namespace vszk.Services
{
    public interface ISoftwareOSConnectService
    {
        Task<List<string>> GetSoftwareOS();
    }
}