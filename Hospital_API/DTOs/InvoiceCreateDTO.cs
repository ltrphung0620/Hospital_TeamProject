namespace Hospital_API.DTOs
{
    public class InvoiceCreateDTO
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }

        public decimal TotalAmount { get; set; }
        public string Status { get; set; }

        public string? Note { get; set; }
        public List<InvoiceDetailCreateDTO> InvoiceDetails { get; set; } = new();

    }
}   
