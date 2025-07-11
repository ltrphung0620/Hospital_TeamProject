using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<Blog>> GetAllAsync()
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Blog>> GetPublishedAsync()
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .Where(b => b.Status == "Published")
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<Blog> GetByIdAsync(int id)
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Blog> GetBySlugAsync(string slug)
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.Slug == slug);
        }

        public async Task<IEnumerable<Blog>> GetByCategoryAsync(string category)
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .Where(b => b.Category == category && b.Status == "Published")
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<Blog> CreateAsync(Blog blog)
        {
            blog.CreatedAt = DateTime.UtcNow;
            blog.Slug = GenerateSlug(blog.Title);
            
            await _context.Blogs.AddAsync(blog);
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog> UpdateAsync(Blog blog)
        {
            Console.WriteLine($"BlogRepository: Updating blog {blog.Id} with status: {blog.Status}"); // Debug log
            
            var existingBlog = await _context.Blogs.FindAsync(blog.Id);
            if (existingBlog == null)
                return null;

            existingBlog.Title = blog.Title;
            existingBlog.Content = blog.Content;
            existingBlog.FeaturedImage = blog.FeaturedImage;
            existingBlog.Category = blog.Category;
            existingBlog.Status = blog.Status;
            existingBlog.Excerpt = blog.Excerpt;
            existingBlog.UpdatedAt = DateTime.UtcNow;
            existingBlog.Slug = GenerateSlug(blog.Title);

            Console.WriteLine($"BlogRepository: Before SaveChanges, status: {existingBlog.Status}"); // Debug log
            await _context.SaveChangesAsync();
            Console.WriteLine($"BlogRepository: After SaveChanges, status: {existingBlog.Status}"); // Debug log

            // Refresh from database to verify
            await _context.Entry(existingBlog).ReloadAsync();
            Console.WriteLine($"BlogRepository: After reload, status: {existingBlog.Status}"); // Debug log

            return existingBlog;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return false;

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Blogs.AnyAsync(b => b.Id == id);
        }

        private string GenerateSlug(string title)
        {
            // Remove special characters
            string slug = title.ToLower()
                .Replace(" ", "-")
                .Replace("đ", "d")
                .Replace("á", "a")
                .Replace("à", "a")
                .Replace("ả", "a")
                .Replace("ã", "a")
                .Replace("ạ", "a")
                .Replace("ă", "a")
                .Replace("ắ", "a")
                .Replace("ằ", "a")
                .Replace("ẳ", "a")
                .Replace("ẵ", "a")
                .Replace("ặ", "a")
                .Replace("â", "a")
                .Replace("ấ", "a")
                .Replace("ầ", "a")
                .Replace("ẩ", "a")
                .Replace("ẫ", "a")
                .Replace("ậ", "a")
                .Replace("é", "e")
                .Replace("è", "e")
                .Replace("ẻ", "e")
                .Replace("ẽ", "e")
                .Replace("ẹ", "e")
                .Replace("ê", "e")
                .Replace("ế", "e")
                .Replace("ề", "e")
                .Replace("ể", "e")
                .Replace("ễ", "e")
                .Replace("ệ", "e")
                .Replace("í", "i")
                .Replace("ì", "i")
                .Replace("ỉ", "i")
                .Replace("ĩ", "i")
                .Replace("ị", "i")
                .Replace("ó", "o")
                .Replace("ò", "o")
                .Replace("ỏ", "o")
                .Replace("õ", "o")
                .Replace("ọ", "o")
                .Replace("ô", "o")
                .Replace("ố", "o")
                .Replace("ồ", "o")
                .Replace("ổ", "o")
                .Replace("ỗ", "o")
                .Replace("ộ", "o")
                .Replace("ơ", "o")
                .Replace("ớ", "o")
                .Replace("ờ", "o")
                .Replace("ở", "o")
                .Replace("ỡ", "o")
                .Replace("ợ", "o")
                .Replace("ú", "u")
                .Replace("ù", "u")
                .Replace("ủ", "u")
                .Replace("ũ", "u")
                .Replace("ụ", "u")
                .Replace("ư", "u")
                .Replace("ứ", "u")
                .Replace("ừ", "u")
                .Replace("ử", "u")
                .Replace("ữ", "u")
                .Replace("ự", "u")
                .Replace("ý", "y")
                .Replace("ỳ", "y")
                .Replace("ỷ", "y")
                .Replace("ỹ", "y")
                .Replace("ỵ", "y");

            // Remove any remaining special characters and replace multiple hyphens with single hyphen
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[^a-z0-9\s-]", "")
                .Replace("--", "-");

            return slug.Trim('-');
        }
    }
} 