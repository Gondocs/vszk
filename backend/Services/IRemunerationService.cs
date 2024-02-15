namespace vszk.Services
{
    public interface IRemunerationService
    {
        Task<List<Remuneration>> GetSoftwareLevels();
    }
}