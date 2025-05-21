using hospital.DTOs;
using System.Collections.Generic;
namespace hospital.Interfaces
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