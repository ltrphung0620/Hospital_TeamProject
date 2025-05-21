using hospital.Data;
using hospital.Interfaces;
using hospital.Models;
using Microsoft.EntityFrameworkCore;
namespace hospital.Repositories
{
    public class Role_PermissionsRepo : IRole_PermissionsRepo
    {
        private readonly HospitalDbContext _context;
        public Role_PermissionsRepo(HospitalDbContext context)
        {
            _context = context;
        }
        public async Task<Role_Permissions> CreateRole_Permission(Role_Permissions role_Permission)
        {
            await _context.Role_Permissions.AddAsync(role_Permission);
            await _context.SaveChangesAsync();
            return role_Permission;
        }
        public async Task<Role_Permissions> DeleteRole_Permission(int id)
        {
            var role_Permission = await _context.Role_Permissions.FindAsync(id);
            if (role_Permission == null)
            {
                return null;
            }
            _context.Role_Permissions.Remove(role_Permission);
            await _context.SaveChangesAsync();
            return role_Permission;
        }
        public async Task<IEnumerable<Role_Permissions>> GetAllRole_Permissions()
        {
            return await _context.Role_Permissions.ToListAsync();
        }
        public async Task<Role_Permissions> GetRole_Permission(int id)
        {
            return await _context.Role_Permissions.FindAsync(id);
        }
        public async Task<Role_Permissions> UpdateRole_Permission(Role_Permissions role_Permission)
        {
            _context.Role_Permissions.Update(role_Permission);
            await _context.SaveChangesAsync();
            return role_Permission;
        }
    }
}