using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _service;
        public PermissionController(IPermissionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionDTO>>> GetAll()
        {
            var permissions = await _service.GetAllAsync();
            return Ok(permissions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PermissionDTO>> GetById(int id)
        {
            var permission = await _service.GetByIdAsync(id);
            if (permission == null) return NotFound();
            return Ok(permission);
        }

        [HttpPost]
        public async Task<ActionResult<PermissionDTO>> Create([FromBody] PermissionCreateDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PermissionDTO>> Update(int id, [FromBody] PermissionDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PermissionDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}