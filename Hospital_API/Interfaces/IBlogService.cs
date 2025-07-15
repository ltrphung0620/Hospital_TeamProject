using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogDTO>> GetAllBlogs();
        Task<IEnumerable<BlogDTO>> GetPublishedBlogs();
        Task<BlogDTO> GetBlogById(int id);
        Task<BlogDTO> CreateBlog(BlogCreateDTO blogCreateDTO, int authorId);
        Task<BlogDTO> UpdateBlog(int id, BlogUpdateDTO blogUpdateDTO);
        Task<bool> DeleteBlog(int id);
    }
} 