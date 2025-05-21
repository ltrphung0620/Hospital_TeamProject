using System.Collections.Generic;
using System.Threading.Tasks;
using hospital.Models;

namespace hospital.Interfaces
{
    public interface IBranchRepository
    {
        Task<IEnumerable<Branch>> GetAllAsync();
        Task<Branch> GetByIdAsync(int id);
        Task<Branch> AddAsync(Branch branch);
        Task<Branch> UpdateAsync(Branch branch);
        Task<Branch> DeleteAsync(int id);
    }
}