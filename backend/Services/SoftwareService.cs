namespace vszk.Services
{
    public class SoftwareService : ISoftwareService
    {
        private readonly DataContext _context;

        public SoftwareService(DataContext context)
        {
            _context = context;
        }

        private float CalculateAverageStars(Software software)
        {
            var ratings = _context
                .Rating.Where(r => r.Software.SoftwareID == software.SoftwareID)
                .Include(r => r.Star)
                .ToList();

            if (ratings.Count == 0)
            {
                return 0;
            }

            float totalStars = 0;

            foreach (var rating in ratings)
            {
                float? starSum =
                    rating.Star.All
                    + rating.Star.Simplicity
                    + rating.Star.Service
                    + rating.Star.Characteristic
                    + rating.Star.Price_value;
                totalStars += (float)starSum / 5;
            }

            float averageStars = totalStars / ratings.Count;
            return averageStars;
        }

        public async Task<List<SoftwareDTO>> GetAllSoftwares()
        {
            var softwareDTOs = await _context
                .Software.Include(x => x.Category)
                .Include(x => x.Company)
                .Include(x => x.Category.CategoryGroup)
                .ToListAsync();

            var softwares = softwareDTOs
                .Select(software => new SoftwareDTO
                {
                    SoftwareID = software.SoftwareID,
                    Name = software.Name,
                    Description = software.Description,
                    Category = software.Category,
                    Company = software.Company,
                    Introduction_fee = software.Introduction_fee,
                    Logo_link = software.Logo_link,
                    Average_stars = CalculateAverageStars(software),
                    Languages = _context
                        .SoftwareLangConnect.Include(x => x.Language)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Language.Lang)
                        .ToList(),
                    Supports = _context
                        .Support.Include(x => x.Language)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Language.Lang)
                        .ToList(),
                    OSs = _context
                        .SoftwareOSConnect.Include(x => x.OS)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.OS.Os)
                        .ToList(),
                    Devices = _context
                        .SoftwareCompConnect.Include(x => x.Compatibility)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Compatibility.Device)
                        .ToList(),
                    Moduls = _context
                        .SoftwareModulConnect.Include(x => x.Modul)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Modul.Name)
                        .ToList(),
                    Remunerations = _context
                        .Remuneration.Include(x => x.Level)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => new RemunerationDTO
                        {
                            RemunerationID = x.RemunerationID,
                            Level = x.Level.Name,
                            Type = x.Type,
                            Price = x.Price
                        })
                        .ToList(),
                    Functions = _context
                        .SoftwareFunction.Include(x => x.Functionality)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => new SoftwareFunctionsDTO
                        {
                            SoftwareFunctionID = x.SoftwareFunctionID,
                            Sfunction = x.Sfunction,
                            Functionality = x.Functionality.Funct
                        })
                        .ToList()
                })
                .ToList();

            return softwares;
        }

        public async Task<SoftwareDTO> GetSoftwareById(int id)
        {
            var software = await _context.Software.FirstOrDefaultAsync(x => x.SoftwareID == id);
            var categoryId = software.Category;

            var softwareList = await _context
                .Software.Include(x => x.Category)
                .Include(x => x.Category.CategoryGroup)
                .Include(x => x.Company)
                .Where(s => s.SoftwareID == id)
                .ToListAsync();

            if (software is not null)
            {
                var extended_software = new SoftwareDTO
                {
                    SoftwareID = software.SoftwareID,
                    Name = software.Name,
                    Description = software.Description,
                    Category = software.Category,
                    Company = software.Company,
                    Introduction_fee = software.Introduction_fee,
                    Logo_link = software.Logo_link,
                    Average_stars = CalculateAverageStars(software),
                    Languages = _context
                        .SoftwareLangConnect.Include(x => x.Language)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Language.Lang)
                        .ToList(),
                    Supports = _context
                        .Support.Include(x => x.Language)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Language.Lang)
                        .ToList(),
                    OSs = _context
                        .SoftwareOSConnect.Include(x => x.OS)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.OS.Os)
                        .ToList(),
                    Devices = _context
                        .SoftwareCompConnect.Include(x => x.Compatibility)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Compatibility.Device)
                        .ToList(),
                    Moduls = _context
                        .SoftwareModulConnect.Include(x => x.Modul)
                        .Include(x => x.Software)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => x.Modul.Name)
                        .ToList(),
                    Remunerations = _context
                        .Remuneration.Include(x => x.Level)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => new RemunerationDTO
                        {
                            RemunerationID = x.RemunerationID,
                            Level = x.Level.Name,
                            Type = x.Type,
                            Price = x.Price
                        })
                        .ToList(),
                    Functions = _context
                        .SoftwareFunction.Include(x => x.Functionality)
                        .Where(x => x.Software.SoftwareID == software.SoftwareID)
                        .Select(x => new SoftwareFunctionsDTO
                        {
                            SoftwareFunctionID = x.SoftwareFunctionID,
                            Sfunction = x.Sfunction,
                            Functionality = x.Functionality.Funct
                        })
                        .ToList()
                };

                return extended_software;
            }
            throw new Exception("Software not found");
        }

        public async Task<List<SoftwareSmallDTO>> GetAllSoftwaresInfos()
        {
            var softwareDTOs = await _context
                .Software.Include(x => x.Category)
                .Include(x => x.Category.CategoryGroup)
                .ToListAsync();

            var softwares = softwareDTOs
                .Select(software => new SoftwareSmallDTO
                {
                    SoftwareID = software.SoftwareID,
                    Name = software.Name,
                    Category_group = software.Category.CategoryGroup.Name,
                    Category = software.Category.Name,
                    Description = software.Description,
                    Logo_link = software.Logo_link
                })
                .ToList();

            return softwares;
        }

        public async Task<User> AddUserFavoriteSoftware(
            UserFavoriteSoftwareDTO userFavoriteSoftwareDTO
        )
        {
            var user = await _context.User.FindAsync(userFavoriteSoftwareDTO.UserID);
            if (user == null)
            {
                return null;
            }

            var software = await _context.Software.FindAsync(userFavoriteSoftwareDTO.SoftwareID);
            if (software == null)
            {
                return null;
            }

            var userSoftwareFavorites = new UserSoftwareFavorites
            {
                User = user,
                Software = software
            };

            _context.UserSoftwareFavorites.Add(userSoftwareFavorites);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<UserFavoriteSoftwareListDTO>> GetUserFavoriteSoftware(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return null;
            }

            /*
            .UserSoftwareFavorites.Where(usf => usf.User == user)
            .Select(usf => usf.Software)
            .ToListAsync();
            */

            var favoriteSoftwareDTOs = await _context
                .Software.Include(x => x.Category)
                .Include(x => x.Company)
                .Include(x => x.Category.CategoryGroup)
                .Where(s =>
                    _context
                        .UserSoftwareFavorites.Where(usf => usf.User == user)
                        .Select(usf => usf.Software.SoftwareID)
                        .Contains(s.SoftwareID)
                )
                .ToListAsync();

            var softwares = favoriteSoftwareDTOs
                .Select(software => new UserFavoriteSoftwareListDTO
                {
                    SoftwareID = software.SoftwareID,
                    Name = software.Name,
                    Description = software.Description,
                    Category = software.Category,
                    Company = software.Company,
                    Introduction_fee = software.Introduction_fee,
                    Logo_link = software.Logo_link,
                    Average_stars = CalculateAverageStars(software),
                })
                .ToList();

            return softwares;
        }

        public async Task<User> RemoveUserFavoriteSoftware(
            UserFavoriteSoftwareDTO userFavoriteSoftwareDTO
        )
        {
            var user = await _context.User.FindAsync(userFavoriteSoftwareDTO.UserID);
            if (user == null)
            {
                return null;
            }

            var software = await _context.Software.FindAsync(userFavoriteSoftwareDTO.SoftwareID);
            if (software == null)
            {
                return null;
            }

            var userSoftwareFavorites = await _context
                .UserSoftwareFavorites.Where(usf => usf.User == user && usf.Software == software)
                .FirstOrDefaultAsync();

            if (userSoftwareFavorites == null)
            {
                return null;
            }

            _context.UserSoftwareFavorites.Remove(userSoftwareFavorites);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<SoftwareSmallDTO>> GetRecommendedSoftwares(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
            {
                return null;
            }

            var softwareDTOs = await _context
                .Software.Include(x => x.Category)
                .Include(x => x.Category.CategoryGroup)
                .Where(x => x.Category == category)
                .ToListAsync();

            var softwares = softwareDTOs
                .Select(software => new SoftwareSmallDTO
                {
                    SoftwareID = software.SoftwareID,
                    Name = software.Name,
                    Category_group = software.Category.CategoryGroup.Name,
                    Category = software.Category.Name,
                    Description = software.Description,
                    Logo_link = software.Logo_link
                })
                .ToList();

            return softwares;
        }

        public async Task<List<SoftwareDTO>> AddSoftware(SoftwareDTO softwareDTO)
        {
            var category = await _context.Category.FindAsync(softwareDTO.Category.CategoryID);
            if (category == null)
            {
                return null;
            }

            var company = await _context.Company.FindAsync(softwareDTO.Company.CompanyID);
            if (company == null)
            {
                return null;
            }

            var software = new Software
            {
                Name = softwareDTO.Name,
                Description = softwareDTO.Description,
                Category = category,
                Company = company,
                Introduction_fee = softwareDTO.Introduction_fee,
                Logo_link = softwareDTO.Logo_link
            };

            var languages = softwareDTO
                .Languages.Select(lang => new SoftwareLangConnect
                {
                    Software = software,
                    Language = _context.Language.First(x => x.Lang == lang)
                })
                .ToList();

            var supports = softwareDTO
                .Supports.Select(support => new Support
                {
                    Software = software,
                    Language = _context.Language.First(x => x.Lang == support)
                })
                .ToList();

            var os = softwareDTO
                .OSs.Select(os => new SoftwareOSConnect
                {
                    Software = software,
                    OS = _context.OS.First(x => x.Os == os)
                })
                .ToList();

            var devices = softwareDTO
                .Devices.Select(device => new SoftwareCompConnect
                {
                    Software = software,
                    Compatibility = _context.Compatibility.First(x => x.Device == device)
                })
                .ToList();

            var moduls = softwareDTO
                .Moduls.Select(modul => new SoftwareModulConnect
                {
                    Software = software,
                    Modul = _context.Modul.First(x => x.Name == modul)
                })
                .ToList();

            var remunerations = softwareDTO
                .Remunerations.Select(remuneration => new Remuneration
                {
                    Software = software,
                    Level = _context.Level.First(x => x.Name == remuneration.Level),
                    Type = remuneration.Type,
                    Price = remuneration.Price
                })
                .ToList();

            var functions = softwareDTO
                .Functions.Select(func => new SoftwareFunction
                {
                    Software = software,
                    Sfunction = func.Sfunction,
                    Functionality = _context.Functionality.First(x => x.Funct == func.Functionality)
                })
                .ToList();

            _context.SoftwareLangConnect.AddRange(languages);
            _context.Support.AddRange(supports);
            _context.SoftwareOSConnect.AddRange(os);
            _context.SoftwareCompConnect.AddRange(devices);
            _context.SoftwareModulConnect.AddRange(moduls);
            _context.Remuneration.AddRange(remunerations);
            _context.SoftwareFunction.AddRange(functions);

            _context.Software.Add(software);
            await _context.SaveChangesAsync();
            return await GetAllSoftwares();
        }

        public async Task<List<SoftwareFunctionsDTO>> GetAllFunctions()
        {
            var functions = await _context
                .Functionality.Select(x => new SoftwareFunctionsDTO
                {
                    SoftwareFunctionID = x.FunctionalityID,
                    Functionality = x.Funct
                })
                .ToListAsync();

            return functions;
        }

        public async Task<List<RemunerationDTO>> GetAllRemunerations()
        {
            var remunerations = await _context
                .Remuneration.Include(x => x.Level)
                .Select(x => new RemunerationDTO
                {
                    RemunerationID = x.RemunerationID,
                    Level = x.Level.Name,
                    Type = x.Type,
                    Price = x.Price
                })
                .ToListAsync();

            return remunerations;
        }

        public async Task<List<SoftwareModulsDTO>> GetAllModuls()
        {
            var moduls = await _context
                .Modul.Select(x => new SoftwareModulsDTO { ModulID = x.ModulID, Name = x.Name })
                .ToListAsync();

            return moduls;
        }

        public async Task<bool> IsUserFavoriteSoftwareById(int userId, int softwareId)
        {
            var user = await _context.User.FindAsync(userId);
            if (user == null)
            {
                return false;
            }

            var software = await _context.Software.FindAsync(softwareId);
            if (software == null)
            {
                return false;
            }

            var userSoftwareFavorites = await _context
                .UserSoftwareFavorites.Where(usf => usf.User == user && usf.Software == software)
                .FirstOrDefaultAsync();

            if (userSoftwareFavorites == null)
            {
                return false;
            }

            return true;
        }
    }
}
