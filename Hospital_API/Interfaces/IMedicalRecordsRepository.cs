using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IMedicalRecordsRepository
    {
        Task<IEnumerable<MedicalRecords>> GetAllAsync();
        Task<MedicalRecords> GetByIdAsync(int id);
        Task<MedicalRecords> AddAsync(MedicalRecords record);
        Task<MedicalRecords> UpdateAsync(MedicalRecords record);
        Task<MedicalRecords> DeleteAsync(int id);
    }
}