using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Hospital_API.DTOs
{
    public class BlogDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FeaturedImage { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string? Excerpt { get; set; }
        public string? Slug { get; set; }
        public List<BlogImageDTO> Images { get; set; } = new List<BlogImageDTO>();
    }

    public class BlogImageDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public bool IsFeatured { get; set; }
        public string? Caption { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class BlogCreateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string? Excerpt { get; set; }
        public List<IFormFile>? Images { get; set; }
        public int? FeaturedImageIndex { get; set; }
    }

    public class BlogUpdateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string? Excerpt { get; set; }
        public List<IFormFile>? NewImages { get; set; }
        public List<int>? ImagesToDelete { get; set; }
        public int? FeaturedImageIndex { get; set; }
    }
} 