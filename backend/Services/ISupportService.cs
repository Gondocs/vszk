namespace vszk.Services
{
    public interface ISupportService
    {
        Task<List<string>> GetSupports();
    }
}