namespace Proyecto_1.DTO
{
    public class OwnerDTO
    {
        public int Id { get; set; }
        public required string Rut { get; set; }
        public required string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public required string Email { get; set; }
    }
}
