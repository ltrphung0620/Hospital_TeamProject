using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Hospital_API.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IImageService _imageService;

        public BlogService(IBlogRepository blogRepository, IImageService imageService)
        {
            _blogRepository = blogRepository;
            _imageService = imageService;
        }

        public async Task<BlogDTO> CreateBlog(BlogCreateDTO blogCreateDTO, int authorId)
        {
            var blog = new Blog
            {
                Title = blogCreateDTO.Title,
                Content = blogCreateDTO.Content,
                Category = blogCreateDTO.Category,
                Excerpt = blogCreateDTO.Excerpt,
                AuthorId = authorId,
                Status = "Draft",
                Slug = GenerateSlug(blogCreateDTO.Title)
            };

            // Upload images if any
            if (blogCreateDTO.Images != null && blogCreateDTO.Images.Any())
            {
                int imageIndex = 0;
                foreach (var image in blogCreateDTO.Images)
                {
                    var uploadResult = await _imageService.UploadImage(
                        image,
                        $"Blog image for {blog.Title}",
                        "Blog"
                    );

                    var blogImage = new BlogImage
                    {
                        ImageUrl = uploadResult.ImageUrl,
                        IsFeatured = blogCreateDTO.FeaturedImageIndex == imageIndex,
                        DisplayOrder = imageIndex
                    };

                    blog.BlogImages.Add(blogImage);
                    
                    // Set featured image
                    if (blogCreateDTO.FeaturedImageIndex == imageIndex)
                    {
                        blog.FeaturedImage = uploadResult.ImageUrl;
                    }

                    imageIndex++;
                }
            }

            var createdBlog = await _blogRepository.CreateBlog(blog);
            return await MapBlogToDTO(createdBlog);
        }

        public async Task<BlogDTO> UpdateBlog(int id, BlogUpdateDTO blogUpdateDTO)
        {
            var blog = await _blogRepository.GetBlogById(id);
            if (blog == null)
                throw new KeyNotFoundException($"Blog with ID {id} not found");

            blog.Title = blogUpdateDTO.Title;
            blog.Content = blogUpdateDTO.Content;
            blog.Category = blogUpdateDTO.Category;
            blog.Status = blogUpdateDTO.Status;
            blog.Excerpt = blogUpdateDTO.Excerpt;
            blog.UpdatedAt = DateTime.UtcNow;

            // Delete images if specified
            if (blogUpdateDTO.ImagesToDelete != null && blogUpdateDTO.ImagesToDelete.Any())
            {
                var imagesToDelete = blog.BlogImages.Where(bi => blogUpdateDTO.ImagesToDelete.Contains(bi.Id)).ToList();
                foreach (var image in imagesToDelete)
                {
                    blog.BlogImages.Remove(image);
                }
            }

            // Upload new images if any
            if (blogUpdateDTO.NewImages != null && blogUpdateDTO.NewImages.Any())
            {
                int imageIndex = blog.BlogImages.Count;
                foreach (var image in blogUpdateDTO.NewImages)
                {
                    var uploadResult = await _imageService.UploadImage(
                        image,
                        $"Blog image for {blog.Title}",
                        "Blog"
                    );

                    var blogImage = new BlogImage
                    {
                        ImageUrl = uploadResult.ImageUrl,
                        IsFeatured = blogUpdateDTO.FeaturedImageIndex == imageIndex,
                        DisplayOrder = imageIndex
                    };

                    blog.BlogImages.Add(blogImage);

                    // Update featured image if specified
                    if (blogUpdateDTO.FeaturedImageIndex == imageIndex)
                    {
                        blog.FeaturedImage = uploadResult.ImageUrl;
                    }

                    imageIndex++;
                }
            }

            var updatedBlog = await _blogRepository.UpdateBlog(blog);
            return await MapBlogToDTO(updatedBlog);
        }

        public async Task<BlogDTO> GetBlogById(int id)
        {
            var blog = await _blogRepository.GetBlogById(id);
            if (blog == null)
                throw new KeyNotFoundException($"Blog with ID {id} not found");

            return await MapBlogToDTO(blog);
        }

        public async Task<IEnumerable<BlogDTO>> GetAllBlogs()
        {
            var blogs = await _blogRepository.GetAllBlogs();
            var blogDTOs = new List<BlogDTO>();

            foreach (var blog in blogs)
            {
                blogDTOs.Add(await MapBlogToDTO(blog));
            }

            return blogDTOs;
        }

        public async Task<IEnumerable<BlogDTO>> GetPublishedBlogs()
        {
            var blogs = await _blogRepository.GetAllBlogs();
            var blogDTOs = new List<BlogDTO>();

            foreach (var blog in blogs.Where(b => b.Status == "Published"))
            {
                blogDTOs.Add(await MapBlogToDTO(blog));
            }

            return blogDTOs;
        }

        public async Task<bool> DeleteBlog(int id)
        {
            return await _blogRepository.DeleteBlog(id);
        }

        private async Task<BlogDTO> MapBlogToDTO(Blog blog)
        {
            return new BlogDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                FeaturedImage = blog.FeaturedImage,
                Category = blog.Category,
                Status = blog.Status,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                AuthorId = blog.AuthorId,
                AuthorName = blog.Author?.Username ?? "Unknown",
                Excerpt = blog.Excerpt,
                Slug = blog.Slug,
                Images = blog.BlogImages.Select(bi => new BlogImageDTO
                {
                    Id = bi.Id,
                    ImageUrl = bi.ImageUrl,
                    IsFeatured = bi.IsFeatured,
                    Caption = bi.Caption,
                    DisplayOrder = bi.DisplayOrder
                }).ToList()
            };
        }

        private string GenerateSlug(string title)
        {
            // Convert to lowercase
            var slug = title.ToLowerInvariant();

            // Remove diacritics
            slug = RemoveDiacritics(slug);

            // Replace spaces with hyphens
            slug = slug.Replace(" ", "-");

            // Remove invalid characters
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[^a-z0-9\-]", "");

            // Remove multiple hyphens
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"-+", "-");

            // Trim hyphens from start and end
            slug = slug.Trim('-');

            return slug;
        }

        private string RemoveDiacritics(string text)
        {
            var normalizedString = text.Normalize(System.Text.NormalizationForm.FormD);
            var stringBuilder = new System.Text.StringBuilder();

            foreach (var c in normalizedString)
            {
                var unicodeCategory = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

            return stringBuilder.ToString().Normalize(System.Text.NormalizationForm.FormC);
        }
    }
} 