using System.Collections.Generic;
using System.Threading.Tasks;
using hospital.Models;
namespace hospital.Interfaces
{
public interface IMedicineSupplierRepository
{
    Task<IEnumerable<MedicineSupplier>> GetAllAsync();
    Task<MedicineSupplier> GetByIdAsync(int id);
    Task<MedicineSupplier> AddAsync(MedicineSupplier supplier);
    Task<MedicineSupplier> UpdateAsync(MedicineSupplier supplier);
    Task<MedicineSupplier> DeleteAsync(int id);
}
}
