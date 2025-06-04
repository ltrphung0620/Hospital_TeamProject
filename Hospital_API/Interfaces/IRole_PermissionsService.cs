using Hospital_API.DTOs;
namespace Hospital_API.Interfaces
{
    public interface IRole_PermissionsService
    {
        Task<IEnumerable<Role_PermissionsDTOs>> GetAllRole_Permissions();
        Task<Role_PermissionsDTOs> GetRole_Permission(int id);
        Task<Role_PermissionsDTOs> CreateRole_Permission(Role_PermissionsDTOs role_Permission);
        Task<Role_PermissionsDTOs> UpdateRole_Permission(Role_PermissionsDTOs role_Permission);
        Task<Role_PermissionsDTOs> DeleteRole_Permission(int id);
    }
}