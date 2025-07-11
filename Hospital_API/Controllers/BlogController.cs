using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        // GET: api/blog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogResponseDTO>>> GetAll()
        {
            var blogs = await _blogService.GetPublishedAsync();
            return Ok(blogs);
        }

        // GET: api/blog/admin
        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<BlogResponseDTO>>> GetAllAdmin()
        {
            var blogs = await _blogService.GetAllAsync();
            return Ok(blogs);
        }

        // GET: api/blog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogResponseDTO>> GetById(int id)
        {
            var blog = await _blogService.GetByIdAsync(id);
            if (blog == null)
                return NotFound();

            return Ok(blog);
        }

        // GET: api/blog/slug/my-blog-post
        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<BlogResponseDTO>> GetBySlug(string slug)
        {
            var blog = await _blogService.GetBySlugAsync(slug);
            if (blog == null)
                return NotFound();

            return Ok(blog);
        }

        // GET: api/blog/category/news
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<BlogResponseDTO>>> GetByCategory(string category)
        {
            var blogs = await _blogService.GetByCategoryAsync(category);
            return Ok(blogs);
        }

        // POST: api/blog
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BlogResponseDTO>> Create([FromBody] BlogCreateDTO blogDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var createdBlog = await _blogService.CreateAsync(blogDto, userId);
            return CreatedAtAction(nameof(GetById), new { id = createdBlog.Id }, createdBlog);
        }

        // PUT: api/blog/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BlogResponseDTO>> Update(int id, [FromBody] BlogUpdateDTO blogDto)
        {
            var updatedBlog = await _blogService.UpdateAsync(id, blogDto);
            if (updatedBlog == null)
                return NotFound();

            return Ok(updatedBlog);
        }

        // DELETE: api/blog/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _blogService.DeleteAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
} 