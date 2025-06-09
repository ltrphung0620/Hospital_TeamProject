namespace Hospital_API.Models
{
    public class Invoice
    {

        public int Id { get; set; }

        public int AppointmentId { get; set; }
        public DateTime IssuedDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Unpaid"; // Unpaid, Paid, Cancelled

        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }

        public Appointment Appointment { get; set; } = null!;
    }

}