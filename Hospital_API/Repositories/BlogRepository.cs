using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly HospitalDbContext _context;

        public BlogRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<Blog> CreateBlog(Blog blog)
        {
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog> UpdateBlog(Blog blog)
        {
            _context.Entry(blog).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog> GetBlogById(int id)
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .Include(b => b.BlogImages)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Blog>> GetAllBlogs()
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .Include(b => b.BlogImages)
                .ToListAsync();
        }

        public async Task<bool> DeleteBlog(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return false;

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 