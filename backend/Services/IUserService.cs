namespace vszk.Services
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetUserById(int id);

        Task<User> UpdateUserSettlement(UserSettlementDTO userSettlementDTO);

        Task<User> UpdateUserData(UserDataChangeDTO userDataChangeDTO);

        Task<User> GetUserByEmail(string email);

        Task<User> UpdateUserDataAdmin(UserDataChangeAdmin userDataChangeAdmin);

        Task<User> DeleteUser(int id);

        Task SendEmailToAllUsers(string subject, string message);

        Task SendEmailToUser(string email, string subject, string message);
    }
}
