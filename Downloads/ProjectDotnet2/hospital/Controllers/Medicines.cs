using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hospital.DTOs;
using hospital.Models;
using hospital.Data;
using hospital.Interfaces;
namespace hospital.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : ControllerBase
    {
        private readonly IMedicinesService _medicinesService;
        public MedicinesController(IMedicinesService service)
        {
            _medicinesService = service;
        }
        [HttpPost]
        public async Task<ActionResult<MedicinesDTO>> CreateMedicines([FromBody] MedicinesDTO medicinesDTO)
        {
            if (medicinesDTO == null)
            {
                return BadRequest("Medicines data is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdMedicines = await _medicinesService.AddMedicineAsync(medicinesDTO);
            return CreatedAtAction("GetMedicines", new { id = createdMedicines.Id }, createdMedicines);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<MedicinesDTO>> UpdateMedicines(int id, [FromBody] MedicinesDTO medicinesDTO)
        {
            if (id != medicinesDTO.Id)
            {
                return BadRequest("Medicines ID mismatch");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedMedicines = await _medicinesService.UpdateMedicineAsync(medicinesDTO);
            if (updatedMedicines == null)
            {
                return NotFound("Medicines not found");
            }
            return NoContent();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicinesDTO>>> GetAllMedicines()
        {
            var medicines = await _medicinesService.GetAllMedicinesAsync();
            if (medicines == null || !medicines.Any())
            {
                return NotFound("No medicines found");
            }
            return Ok(medicines);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<MedicinesDTO>> DeleteMedicines(int id)
        {
            var deletedMedicines = await _medicinesService.DeleteMedicineAsync(id);
            if (deletedMedicines == null)
            {
                return NotFound("Medicines not found");
            }
            return Ok(deletedMedicines);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicinesDTO>> GetMedicines(int id)
        {
            var medicines = await _medicinesService.GetMedicineByIdAsync(id);
            if (medicines == null)
            {
                return NotFound("Medicines not found");
            }
            return Ok(medicines);
        }
    }
}