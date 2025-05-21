using System.Collections.Generic;
using System.Threading.Tasks;
using hospital.DTOs;

namespace hospital.Interfaces
{
    public interface IBranchService
    {
        Task<IEnumerable<BranchDTO>> GetAllAsync();
        Task<BranchDTO> GetByIdAsync(int id);
        Task<BranchDTO> AddAsync(BranchCreateDTO dto);
        Task<BranchDTO> UpdateAsync(BranchDTO dto);
        Task<BranchDTO> DeleteAsync(int id);
    }
}