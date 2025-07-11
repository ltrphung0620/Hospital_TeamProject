using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogResponseDTO>> GetAllAsync();
        Task<IEnumerable<BlogResponseDTO>> GetPublishedAsync();
        Task<BlogResponseDTO> GetByIdAsync(int id);
        Task<BlogResponseDTO> GetBySlugAsync(string slug);
        Task<IEnumerable<BlogResponseDTO>> GetByCategoryAsync(string category);
        Task<BlogResponseDTO> CreateAsync(BlogCreateDTO blogDto, int authorId);
        Task<BlogResponseDTO> UpdateAsync(int id, BlogUpdateDTO blogDto);
        Task<bool> DeleteAsync(int id);
    }
} 