using Hospital_API.DTOs;
using System.Collections.Generic;
namespace Hospital_API.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleDTO>> GetAllAsync();
        Task<RoleDTO> GetByIdAsync(int id);
        Task<RoleDTO> AddAsync(RoleCreateDTO roleCreateDTO);
        Task<RoleDTO> UpdateAsync(RoleDTO dto);
        Task<RoleDTO> DeleteAsync(int id);
    }
}