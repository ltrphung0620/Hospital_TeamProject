using System;

namespace Hospital_API.DTOs
{
    public class BlogCreateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FeaturedImage { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string? Excerpt { get; set; }
    }

    public class BlogUpdateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FeaturedImage { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string? Excerpt { get; set; }
    }

    public class BlogResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FeaturedImage { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Excerpt { get; set; }
        public string? Slug { get; set; }
        public UserResponse Author { get; set; }
    }
} 