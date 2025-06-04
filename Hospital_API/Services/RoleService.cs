using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;  
namespace Hospital_API.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public RoleDTO MapToDTO(Role role)
        {
            return new RoleDTO
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description
            };
        }
        //get all roles
        public async Task<IEnumerable<RoleDTO>> GetAllAsync()
        {
            var roles = await _roleRepository.GetAllAsync();
            return roles.Select(role => MapToDTO(role));
        }
        //get role by id
        public async Task<RoleDTO> GetByIdAsync(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null)
            {
                return null;
            }
            return MapToDTO(role);
        }
        //add role
        public async Task<RoleDTO> AddAsync(RoleCreateDTO roleCreateDTO)
        {
            var role = new Role
            {
                Name = roleCreateDTO.Name,
                Description = roleCreateDTO.Description
            };
            var createdRole = await _roleRepository.AddAsync(role);
            return MapToDTO(createdRole);
        }
        //update role
        public async Task<RoleDTO> UpdateAsync(RoleDTO roleDTO)
        {
            var role = await _roleRepository.GetByIdAsync(roleDTO.Id);
            if (role == null)
            {
                return null;
            }
            role.Name = roleDTO.Name;
            role.Description = roleDTO.Description;
            var updatedRole = await _roleRepository.UpdateAsync(role);
            return MapToDTO(updatedRole);
        }
        //delete role
        public async Task<RoleDTO> DeleteAsync(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null)
            {
                return null;
            }
            var deletedRole = await _roleRepository.DeleteAsync(id);
            return MapToDTO(deletedRole);
        }

    }
}