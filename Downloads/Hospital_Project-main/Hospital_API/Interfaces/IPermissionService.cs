using System.Collections.Generic;
using System.Threading.Tasks;
using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
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