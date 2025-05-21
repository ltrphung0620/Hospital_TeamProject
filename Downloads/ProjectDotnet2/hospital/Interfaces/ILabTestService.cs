using hospital.Models;
using hospital.DTOs;
namespace hospital.Interfaces
{
    public interface ILabTestService
    {
        Task<LabTestDTO> AddLabTestAsync(LabTestDTO labTestDTO);
        Task<IEnumerable<LabTestDTO>> GetAllLabTestsAsync();
        Task<LabTestDTO> UpdateLabTestAsync(LabTestDTO labTestDTO);
        Task<LabTestDTO> DeleteLabTestAsync(int id);
        Task<LabTestDTO> GetLabTestByIdAsync(int id);
    }
}