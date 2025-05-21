using hospital.DTOs;
using hospital.Models;
namespace hospital.Interfaces
{
    public interface IMedicinesService
    {
        Task<MedicinesDTO> AddMedicineAsync(MedicinesDTO medicinesDTO);
        Task<IEnumerable<MedicinesDTO>> GetAllMedicinesAsync();
        Task<MedicinesDTO> UpdateMedicineAsync(MedicinesDTO medicinesDTO);
        Task<MedicinesDTO> DeleteMedicineAsync(int id);
        Task<MedicinesDTO> GetMedicineByIdAsync(int id);

    }
}