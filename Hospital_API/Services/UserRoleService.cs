using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class UserRoleService : IUserRoleService
{
    private readonly IUserRoleRepository _repo;

    public UserRoleService(IUserRoleRepository repo)
    {
        _repo = repo;
    }

    public async Task<bool> AssignRolesAsync(AssignRolesDto dto)
    {
        await _repo.RemoveRangeByUserIdAsync(dto.UserId);

        var newUserRoles = dto.RoleIds.Distinct()
            .Select(roleId => new UserRole
            {
                UserId = dto.UserId,
                RoleId = roleId
            }).ToList();

        await _repo.AddRangeAsync(newUserRoles);
        return await _repo.SaveChangesAsync();
    }

    public async Task<List<UserRoleDTO>> GetRolesByUserIdAsync(int userId)
    {
        var userRoles = await _repo.GetByUserIdAsync(userId);
        return userRoles.Select(ur => new UserRoleDTO
        {
            Id = ur.Role.Id,
            Name = ur.Role.Name
        }).ToList();
    }

    public async Task<bool> RemoveRoleAsync(int userId, int roleId)
    {
        return await _repo.RemoveAsync(userId, roleId);
    }
}

}