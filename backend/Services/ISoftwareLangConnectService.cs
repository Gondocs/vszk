namespace vszk.Services
{
    public interface ISoftwareLangConnectService
    {
        Task<List<string>> GetSoftwareLanguages();
    }
}