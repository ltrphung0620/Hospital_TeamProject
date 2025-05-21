using System.Collections.Generic;
using System.Threading.Tasks;
using hospital.DTOs;

namespace hospital.Interfaces
{
    public interface IPermissionService
    {
        Task<IEnumerable<PermissionDTO>> GetAllAsync();
        Task<PermissionDTO> GetByIdAsync(int id);
        Task<PermissionDTO> AddAsync(PermissionCreateDTO dto);
        Task<PermissionDTO> UpdateAsync(PermissionDTO dto);
        Task<PermissionDTO> DeleteAsync(int id);
    }
}