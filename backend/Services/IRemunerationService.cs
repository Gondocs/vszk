namespace vszk.Services
{
    public interface IRemunerationService
    {
        Task<List<Remuneration>> GetSoftwareLevels();

        Task<List<string>> GetAllLevels();

        Task<List<string>> GetAllTypes();
    }
}