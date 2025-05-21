using hospital.Models;
using hospital.DTOs;
namespace hospital.Interfaces
{
    public interface IMedServiceService
    {
        Task<IEnumerable<MedicalServiceDTO>> GetAllMedServices();
        Task<MedicalServiceDTO> GetMedServiceById(int id);
        Task<MedicalServiceDTO> CreateMedService(MedicalServiceDTO medService);
        Task<MedicalServiceDTO> UpdateMedService(MedicalServiceDTO medService);
        Task<MedicalServiceDTO> DeleteMedService(int id);
    }
}
