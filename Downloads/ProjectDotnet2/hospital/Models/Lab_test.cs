using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace hospital.Models
{
    public class LabTest
    {
        [Key]
        public int LabTestId { get; set; }
        public string LabTestName { get; set; }
        public string LabTestDescription { get; set; }
        public decimal LabTestPrice { get; set; }
    }
}