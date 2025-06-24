using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _repo;
        private readonly IUserRepository _userRepo;

        public DoctorService(IDoctorRepository repo, IUserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        public async Task<IEnumerable<DoctorDTO>> GetAllAsync()
        {
            var doctors = await _repo.GetAllAsync();
            return doctors.Select(d => new DoctorDTO
            {
                Id = d.Id,
                UserId = d.UserId,
                FullName = d.User.FullName,
                Specialization = d.Specialization,
                Degree = d.Degree,
                YearOfExperience = d.YearOfExperience
            });
        }

        public async Task<DoctorDTO?> GetByIdAsync(int id)
        {
            var d = await _repo.GetByIdAsync(id);
            if (d == null) return null;

            return new DoctorDTO
            {
                Id = d.Id,
                UserId = d.UserId,
                FullName = d.User.FullName,
                Specialization = d.Specialization,
                Degree = d.Degree,
                YearOfExperience = d.YearOfExperience
            };
        }

        public async Task<DoctorDTO?> GetByUserIdAsync(int userId)
        {
            var d = await _repo.GetByUserIdAsync(userId);
            if (d == null) return null;

            return new DoctorDTO
            {
                Id = d.Id,
                UserId = d.UserId,
                FullName = d.User.FullName ?? "",
                Specialization = d.Specialization,
                Degree = d.Degree,
                YearOfExperience = d.YearOfExperience
            };
        }

        public async Task<DoctorDTO> CreateAsync(DoctorCreateDTO dto)
        {
            var entity = new Doctor
            {
                UserId = dto.UserId,
                Specialization = dto.Specialization,
                Degree = dto.Degree,
                YearOfExperience = dto.YearOfExperience
            };

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();

            return await GetByIdAsync(entity.Id) ?? throw new Exception("Create failed");
        }

        public async Task<DoctorDTO?> UpdateAsync(DoctorUpdateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(dto.Id);
            if (entity == null) return null;

            entity.Specialization = dto.Specialization;
            entity.Degree = dto.Degree;
            entity.YearOfExperience = dto.YearOfExperience;

            await _repo.UpdateAsync(entity);
            await _repo.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            await _repo.DeleteAsync(entity);
            return await _repo.SaveChangesAsync();
        }
    }

}