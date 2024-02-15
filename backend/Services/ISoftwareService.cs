namespace vszk.Services
{
    public interface ISoftwareService
    {
        Task<List<SoftwareDTO>> GetAllSoftwares();

        Task<SoftwareDTO> GetSoftwareById(int id);

        Task<List<SoftwareSmallDTO>> GetAllSoftwaresInfos();
    }
}