using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Hospital_API.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;

        public BlogService(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        public async Task<IEnumerable<BlogResponseDTO>> GetAllAsync()
        {
            var blogs = await _blogRepository.GetAllAsync();
            return blogs.Select(MapToResponseDTO);
        }

        public async Task<IEnumerable<BlogResponseDTO>> GetPublishedAsync()
        {
            var blogs = await _blogRepository.GetPublishedAsync();
            return blogs.Select(MapToResponseDTO);
        }

        public async Task<BlogResponseDTO> GetByIdAsync(int id)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            return blog == null ? null : MapToResponseDTO(blog);
        }

        public async Task<BlogResponseDTO> GetBySlugAsync(string slug)
        {
            var blog = await _blogRepository.GetBySlugAsync(slug);
            return blog == null ? null : MapToResponseDTO(blog);
        }

        public async Task<IEnumerable<BlogResponseDTO>> GetByCategoryAsync(string category)
        {
            var blogs = await _blogRepository.GetByCategoryAsync(category);
            return blogs.Select(MapToResponseDTO);
        }

        public async Task<BlogResponseDTO> CreateAsync(BlogCreateDTO blogDto, int authorId)
        {
            var blog = new Blog
            {
                Title = blogDto.Title,
                Content = blogDto.Content,
                FeaturedImage = blogDto.FeaturedImage,
                Category = blogDto.Category,
                Status = blogDto.Status,
                Excerpt = blogDto.Excerpt,
                AuthorId = authorId
            };

            var createdBlog = await _blogRepository.CreateAsync(blog);
            return MapToResponseDTO(createdBlog);
        }

        public async Task<BlogResponseDTO> UpdateAsync(int id, BlogUpdateDTO blogDto)
        {
            Console.WriteLine($"BlogService: Updating blog {id} with status: {blogDto.Status}"); // Debug log
            
            var existingBlog = await _blogRepository.GetByIdAsync(id);
            if (existingBlog == null)
                return null;

            existingBlog.Title = blogDto.Title;
            existingBlog.Content = blogDto.Content;
            existingBlog.FeaturedImage = blogDto.FeaturedImage;
            existingBlog.Category = blogDto.Category;
            existingBlog.Status = blogDto.Status;
            existingBlog.Excerpt = blogDto.Excerpt;

            Console.WriteLine($"BlogService: Mapped DTO to entity, status: {existingBlog.Status}"); // Debug log

            var updatedBlog = await _blogRepository.UpdateAsync(existingBlog);
            Console.WriteLine($"BlogService: Blog updated in repository, status: {updatedBlog.Status}"); // Debug log

            return MapToResponseDTO(updatedBlog);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _blogRepository.DeleteAsync(id);
        }

        private BlogResponseDTO MapToResponseDTO(Blog blog)
        {
            if (blog == null) return null;

            return new BlogResponseDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                FeaturedImage = blog.FeaturedImage,
                Category = blog.Category,
                Status = blog.Status,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                Excerpt = blog.Excerpt,
                Slug = blog.Slug,
                Author = new UserResponse
                {
                    Id = blog.Author.Id,
                    Username = blog.Author.Username,
                    Email = blog.Author.Email,
                    FullName = blog.Author.FullName
                }
            };
        }
    }
} 