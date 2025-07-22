using Hospital_API.DTOs;
using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<IEnumerable<Invoice>> GetAllAsync();
        Task<Invoice?> GetByIdAsync(int id);
        Task<Invoice?> GetByAppointmentIdAsync(int appointmentId);
        Task AddAsync(Invoice invoice);
        Task UpdateAsync(Invoice invoice);
        Task DeleteAsync(Invoice invoice);

        Task<int> CreateWithDetailsAsync(InvoiceCreateDTO dto);

    }

}