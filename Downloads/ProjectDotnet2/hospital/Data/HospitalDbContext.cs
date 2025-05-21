using Microsoft.EntityFrameworkCore;
using hospital.Models;
namespace hospital.Data
{
    public class HospitalDbContext : DbContext
    {
        //contructor
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options) { }
        // add các Model entity
        public DbSet<Medicines> Medicines { get; set; }
        public DbSet<MedicineSupplier> MedicineSuppliers { get; set; }
        public DbSet<MedicalServiceDb> MedicalServices { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<LabTest> LabTests { get; set; }
        // public DbSet<Role_Permission> Role_Permissions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Role_Permissions> Role_Permissions { get; set; }
    }
}
