using hospital.DTOs;
using hospital.Interfaces;
using hospital.Models;

namespace hospital.Services
{
    public class Role_PermissionsService : IRole_PermissionsService
    {
        private readonly IRole_PermissionsRepo _role_PermissionsRepo;
        public Role_PermissionsService(IRole_PermissionsRepo role_PermissionsRepo)
        {
            _role_PermissionsRepo = role_PermissionsRepo;
        }
        public Role_PermissionsDTOs MapToDTO(Role_Permissions role_Permission)
        {
            return new Role_PermissionsDTOs
            {
                RoleId = role_Permission.RoleId,
                PermissionId = role_Permission.PermissionId
            };
        }
        public async Task<Role_PermissionsDTOs> CreateRole_Permission(Role_PermissionsDTOs role_Permission)
        {
            var newRole_Permission = new Role_Permissions
            {
                RoleId = role_Permission.RoleId,
                PermissionId = role_Permission.PermissionId
            };
            var createdRole_Permission = await _role_PermissionsRepo.CreateRole_Permission(newRole_Permission);
            return MapToDTO(createdRole_Permission);
        }
        public async Task<Role_PermissionsDTOs> DeleteRole_Permission(int id)
        {
            var deletedRole_Permission = await _role_PermissionsRepo.DeleteRole_Permission(id);
            if (deletedRole_Permission == null)
            {
                return null;
            }
            return MapToDTO(deletedRole_Permission);
        }
        public async Task<IEnumerable<Role_PermissionsDTOs>> GetAllRole_Permissions()
        {
            var role_Permissions = await _role_PermissionsRepo.GetAllRole_Permissions();
            return role_Permissions.Select(MapToDTO);
        }
        public async Task<Role_PermissionsDTOs> GetRole_Permission(int id)
        {
            var role_Permission = await _role_PermissionsRepo.GetRole_Permission(id);
            if (role_Permission == null)
            {
                return null;
            }
            return MapToDTO(role_Permission);
        }
        public async Task<Role_PermissionsDTOs> UpdateRole_Permission(Role_PermissionsDTOs role_Permission)
        {
            var updatedRole_Permission = new Role_Permissions
            {
                RoleId = role_Permission.RoleId,
                PermissionId = role_Permission.PermissionId
            };
            var result = await _role_PermissionsRepo.UpdateRole_Permission(updatedRole_Permission);
            return MapToDTO(result);
        }    
    }
}