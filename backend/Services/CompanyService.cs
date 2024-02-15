namespace vszk.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly DataContext _context;
        
        public CompanyService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Company>> GetCompanies()
        {
            return await _context.Company.ToListAsync();
        }

        public async Task<CompanyDTO> GetCompany(int id)
        {
            var company = await _context.Company.SingleOrDefaultAsync(c => c.CompanyID == id);

            if (company is not null)
            {
                var companyDTO = new CompanyDTO
                {
                    CompanyID = company.CompanyID,
                    Name = company.Name,
                    Location = company.Location,
                    Phone = company.Phone,
                    Website = company.Website,
                    Logo_link = company.Logo_link,
                    Email = company.Email,
                    Softwares = _context.Software.Where(s => s.Company.CompanyID == company.CompanyID)
                        .Select(s => new SoftwareSmallDTO
                        {
                            SoftwareID = s.SoftwareID,
                            Name = s.Name,
                            Category_group = s.Category.CategoryGroup.Name,
                            Category = s.Category.Name
                        }).ToList()
                };

                return companyDTO;
            }
            throw new Exception("Software not found");
        }
    }
}