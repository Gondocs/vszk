namespace vszk.Services
{
    public interface ICompanyService
    {
        Task<List<Company>> GetCompanies();

        Task<CompanyDTO> GetCompany(int id);

        Task<Company> AddCompany(Company company);
    }
}