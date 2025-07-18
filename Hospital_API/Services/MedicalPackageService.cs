using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class MedicalPackageService : IMedicalPackageService
    {
        private readonly IMedicalPackageRepository _repo;

        public MedicalPackageService(IMedicalPackageRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<MedicalPackageResponseDTO>> GetAllAsync()
        {
            var packages = await _repo.GetAllAsync();

            return packages.Select(p => new MedicalPackageResponseDTO
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                IsRecommended = p.IsRecommended
            }).ToList();
        }

        public async Task<MedicalPackageResponseDTO?> GetByIdAsync(int id)
        {
            var pkg = await _repo.GetByIdAsync(id);
            if (pkg == null) return null;

            return new MedicalPackageResponseDTO
            {
                Id = pkg.Id,
                Name = pkg.Name,
                Price = pkg.Price,
                IsRecommended = pkg.IsRecommended
            };
        }

        public async Task<MedicalPackageResponseDTO> CreateAsync(MedicalPackageCreateDTO dto)
        {
            var entity = new MedicalPackageDb
            {
                Name = dto.Name,
                Price = dto.Price,
                IsRecommended = dto.IsRecommended
            };

            var created = await _repo.CreateAsync(entity);

            return new MedicalPackageResponseDTO
            {
                Id = created.Id,
                Name = created.Name,
                Price = created.Price,
                IsRecommended = created.IsRecommended
            };
        }

        public async Task<bool> UpdateAsync(int id, MedicalPackageUpdateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            entity.Name = dto.Name;
            entity.Price = dto.Price;
            entity.IsRecommended = dto.IsRecommended;

            return await _repo.UpdateAsync(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            return await _repo.DeleteAsync(entity);
        }
    }
}
