using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IBlogRepository
    {
        Task<IEnumerable<Blog>> GetAllAsync();
        Task<IEnumerable<Blog>> GetPublishedAsync();
        Task<Blog> GetByIdAsync(int id);
        Task<Blog> GetBySlugAsync(string slug);
        Task<IEnumerable<Blog>> GetByCategoryAsync(string category);
        Task<Blog> CreateAsync(Blog blog);
        Task<Blog> UpdateAsync(Blog blog);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
} 