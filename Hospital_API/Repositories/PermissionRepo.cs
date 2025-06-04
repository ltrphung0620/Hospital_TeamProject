using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;
namespace Hospital_API.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly HospitalDbContext _context;
        public PermissionRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Permission>> GetAllAsync()
        {
            return await _context.Permissions.ToListAsync();
        }

        public async Task<Permission> GetByIdAsync(int id)
        {
            return await _context.Permissions.FindAsync(id);
        }

        public async Task<Permission> AddAsync(Permission permission)
        {
            _context.Permissions.Add(permission);
            await _context.SaveChangesAsync();
            return permission;
        }

        public async Task<Permission> UpdateAsync(Permission permission)
        {
            _context.Permissions.Update(permission);
            await _context.SaveChangesAsync();
            return permission;
        }

        public async Task<Permission> DeleteAsync(int id)
        {
            var permission = await _context.Permissions.FindAsync(id);
            if (permission != null)
            {
                _context.Permissions.Remove(permission);
                await _context.SaveChangesAsync();
            }
            return permission;
        }
    }
}