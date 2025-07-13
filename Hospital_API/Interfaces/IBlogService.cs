using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IBlogService
    {
        Task<BlogDTO> CreateBlog(BlogCreateDTO blogCreateDTO, int authorId);
        Task<BlogDTO> UpdateBlog(int id, BlogUpdateDTO blogUpdateDTO);
        Task<BlogDTO> GetBlogById(int id);
        Task<IEnumerable<BlogDTO>> GetAllBlogs();
        Task<bool> DeleteBlog(int id);
    }
} 