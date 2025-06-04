using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IRole_PermissionsRepo
    {
        Task<Role_Permissions> GetRole_Permission(int id);
        Task<IEnumerable<Role_Permissions>> GetAllRole_Permissions();
        Task<Role_Permissions> CreateRole_Permission(Role_Permissions role_Permission);
        Task<Role_Permissions> UpdateRole_Permission(Role_Permissions role_Permission);
        Task<Role_Permissions> DeleteRole_Permission(int id);

    }
}