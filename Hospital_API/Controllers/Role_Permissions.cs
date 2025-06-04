using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Hospital_API.DTOs;
namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Role_PermissionsController : ControllerBase
    {
        public readonly IRole_PermissionsService _role_PermissionsService;
        public Role_PermissionsController(IRole_PermissionsService role_PermissionsService)
        {
            _role_PermissionsService = role_PermissionsService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role_PermissionsDTOs>>> GetAllRole_Permissions()
        {
            var role_Permissions = await _role_PermissionsService.GetAllRole_Permissions();
            return Ok(role_Permissions);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Role_PermissionsDTOs>> GetRole_Permission(int id)
        {
            var role_Permission = await _role_PermissionsService.GetRole_Permission(id);
            if (role_Permission == null)
            {
                return NotFound();
            }
            return Ok(role_Permission);
        }
        [HttpPost]
        public async Task<ActionResult<Role_PermissionsDTOs>> CreateRole_Permission([FromBody] Role_PermissionsDTOs role_Permission)
        {
            var createdRole_Permission = await _role_PermissionsService.CreateRole_Permission(role_Permission);
            return CreatedAtAction(nameof(GetRole_Permission), new { id = createdRole_Permission.RoleId }, createdRole_Permission);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Role_PermissionsDTOs>> UpdateRole_Permission(int id, [FromBody] Role_PermissionsDTOs role_Permission)
        {
            if (id != role_Permission.RoleId)
            {
                return BadRequest();
            }
            var updatedRole_Permission = await _role_PermissionsService.UpdateRole_Permission(role_Permission);
            if (updatedRole_Permission == null)
            {
                return NotFound();
            }
            return Ok(updatedRole_Permission);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Role_PermissionsDTOs>> DeleteRole_Permission(int id)
        {
            var deletedRole_Permission = await _role_PermissionsService.DeleteRole_Permission(id);
            if (deletedRole_Permission == null)
            {
                return NotFound();
            }
            return Ok(deletedRole_Permission);
        }
    }
}