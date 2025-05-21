using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hospital.DTOs;
using hospital.Models;
using hospital.Interfaces;

namespace hospital.Services
{
    public class PermissionService : IPermissionService
    {
        private readonly IPermissionRepository _repository;
        public PermissionService(IPermissionRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PermissionDTO>> GetAllAsync()
        {
            var permissions = await _repository.GetAllAsync();
            return permissions.Select(MapToDTO).ToList();
        }

        public async Task<PermissionDTO> GetByIdAsync(int id)
        {
            var permission = await _repository.GetByIdAsync(id);
            return permission == null ? null : MapToDTO(permission);
        }

        public async Task<PermissionDTO> AddAsync(PermissionCreateDTO dto)
        {
            var permission = new Permission
            {
                Name = dto.Name,
                Description = dto.Description
            };
            var result = await _repository.AddAsync(permission);
            return MapToDTO(result);
        }

        public async Task<PermissionDTO> UpdateAsync(PermissionDTO dto)
        {
            var permission = new Permission
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description
            };
            var result = await _repository.UpdateAsync(permission);
            return MapToDTO(result);
        }

        public async Task<PermissionDTO> DeleteAsync(int id)
        {
            var result = await _repository.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private PermissionDTO MapToDTO(Permission permission)
        {
            return new PermissionDTO
            {
                Id = permission.Id,
                Name = permission.Name,
                Description = permission.Description
            };
        }
    }
}