using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Hospital_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await _blogService.GetPublishedBlogs();
            return Ok(blogs);
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBlogsAdmin()
        {
            var blogs = await _blogService.GetAllBlogs();
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById(int id)
        {
            try
            {
                var blog = await _blogService.GetBlogById(id);
                return Ok(blog);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateBlog([FromForm] BlogCreateDTO blogCreateDTO)
        {
            var authorId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var blog = await _blogService.CreateBlog(blogCreateDTO, authorId);
            return CreatedAtAction(nameof(GetBlogById), new { id = blog.Id }, blog);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] BlogUpdateDTO blogUpdateDTO)
        {
            try
            {
                var blog = await _blogService.UpdateBlog(id, blogUpdateDTO);
                return Ok(blog);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var result = await _blogService.DeleteBlog(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
} 