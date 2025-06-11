using Microsoft.EntityFrameworkCore;
using Hospital_API.Models;

namespace Hospital_API.Data
{
    public class HospitalDbContext : DbContext
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options) { }

        public DbSet<Branch> Branches { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Lab_test> LabTests { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<MedicalServiceDb> MedicalServices { get; set; }
        public DbSet<MedicineSupplier> MedicineSuppliers { get; set; }
        public DbSet<Medicines> Medicines { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<PrescriptionDetails> PrescriptionDetails { get; set; }
        public DbSet<Prescriptions> Prescriptions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Role_Permissions> Role_Permissions { get; set; }
        public DbSet<TestRequest> TestRequests { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<WaitingList> WaitingLists { get; set; }
    }
}
