using System.ComponentModel.DataAnnotations;

namespace Hospital_API.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        
    }
}