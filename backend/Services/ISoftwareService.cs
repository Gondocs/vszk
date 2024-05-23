namespace vszk.Services
{
    public interface ISoftwareService
    {
        Task<List<SoftwareDTO>> GetAllSoftwares();

        Task<SoftwareDTO> GetSoftwareById(int id);

        Task<List<SoftwareSmallDTO>> GetAllSoftwaresInfos();

        Task<User> AddUserFavoriteSoftware(UserFavoriteSoftwareDTO userFavoriteSoftwareDTO);

        Task<List<UserFavoriteSoftwareListDTO>> GetUserFavoriteSoftware(int id);

        Task<User> RemoveUserFavoriteSoftware(UserFavoriteSoftwareDTO userFavoriteSoftwareDTO);

        Task<List<SoftwareSmallDTO>> GetRecommendedSoftwares(int id);

        Task<List<SoftwareDTO>> AddSoftware(SoftwareDTO softwareDTO);

        Task<List<SoftwareFunctionsDTO>> GetAllFunctions();

        Task<List<RemunerationDTO>> GetAllRemunerations();

        Task<List<SoftwareModulsDTO>> GetAllModuls();

        Task<bool> IsUserFavoriteSoftwareById(int userId, int softwareId);

        Task<List<SoftwareDTO>> AddNewSoftware(SoftwareDTO softwareDTO);
    }
}