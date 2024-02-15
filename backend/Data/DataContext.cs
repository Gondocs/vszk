namespace vszk.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.Migrate();
        }

        public DbSet<Category> Category {get; set;}
        public DbSet<CategoryGroup> CategoryGroup {get; set;}
        public DbSet<CatFuncConnect> CatFuncConnect {get; set;}
        public DbSet<Company> Company {get; set;}
        public DbSet<Compatibility> Compatibility {get; set;}
        public DbSet<Functionality> Functionality {get; set;}
        public DbSet<Language> Language {get; set;}
        public DbSet<Level> Level {get; set;}
        public DbSet<Modul> Modul {get; set;}
        public DbSet<OS> OS {get; set;}
        public DbSet<Rating> Rating {get; set;}
        public DbSet<Remuneration> Remuneration {get; set;}
        public DbSet<Software> Software {get; set;}
        public DbSet<SoftwareCompConnect> SoftwareCompConnect {get; set;}
        public DbSet<SoftwareFunction> SoftwareFunction {get; set;}
        public DbSet<SoftwareLangConnect> SoftwareLangConnect {get; set;}
        public DbSet<SoftwareModulConnect> SoftwareModulConnect {get; set;}
        public DbSet<SoftwareOSConnect> SoftwareOSConnect {get; set;}
        public DbSet<Star> Star {get; set;}
        public DbSet<Support> Support {get; set;}
        public DbSet<TextRating> TextRating {get; set;}
        public DbSet<User> User {get; set;}
    }
}