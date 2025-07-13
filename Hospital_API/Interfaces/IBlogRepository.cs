using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IBlogRepository
    {
        Task<Blog> CreateBlog(Blog blog);
        Task<Blog> UpdateBlog(Blog blog);
        Task<Blog> GetBlogById(int id);
        Task<IEnumerable<Blog>> GetAllBlogs();
        Task<bool> DeleteBlog(int id);
    }
} 