namespace vszk.Services
{
    public interface ISoftwareService
    {
        Task<List<SoftwareDTO>> GetAllSoftwares();

        Task<SoftwareDTO> GetSoftwareById(int id);

        Task<List<SoftwareSmallDTO>> GetAllSoftwaresInfos();

        Task<User> AddUserFavoriteSoftware(UserFavoriteSoftwareDTO userFavoriteSoftwareDTO);

        Task<List<SoftwareSmallDTO>> GetUserFavoriteSoftware(int id);

        Task<User> RemoveUserFavoriteSoftware(UserFavoriteSoftwareDTO userFavoriteSoftwareDTO);

    }
}