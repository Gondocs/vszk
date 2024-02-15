namespace vszk.Services
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers();
    }
}