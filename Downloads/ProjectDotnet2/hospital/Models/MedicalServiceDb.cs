using System.ComponentModel.DataAnnotations;

namespace hospital.Models
{
    public class MedicalServiceDb
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}