namespace hospital.DTOs
{
    public class PermissionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class PermissionCreateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}