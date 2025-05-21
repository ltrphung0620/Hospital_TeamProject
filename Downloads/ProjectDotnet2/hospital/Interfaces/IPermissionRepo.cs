using System.Collections.Generic;
using System.Threading.Tasks;
using hospital.Models;

namespace hospital.Interfaces
{
    public interface IPermissionRepository
    {
        Task<IEnumerable<Permission>> GetAllAsync();
        Task<Permission> GetByIdAsync(int id);
        Task<Permission> AddAsync(Permission permission);
        Task<Permission> UpdateAsync(Permission permission);
        Task<Permission> DeleteAsync(int id);
    }
}