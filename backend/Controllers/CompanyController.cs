namespace vszk.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Company>>> Get()
        {
            return await _companyService.GetCompanies();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDTO>> GetSingle(int id)
        {
            return await _companyService.GetCompany(id);
        }
    }
}