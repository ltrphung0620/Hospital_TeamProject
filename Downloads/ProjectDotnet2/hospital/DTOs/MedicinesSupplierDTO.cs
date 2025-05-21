using System.Collections.Generic;
using System.Threading.Tasks;
using hospital.Models;
namespace hospital.DTOs
{
    public class MedicineSupplierDTO
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public List<MedicinesDTO> Medicines { get; set; }
    }
    public class MedicineSupplierCreateDTO
    {
        public string SupplierName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
