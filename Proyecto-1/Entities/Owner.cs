namespace Proyecto_1.Entities
{
    public class Owner
    {
        public int Id { get; set; }
        public required string Rut { get; set; }
        public required string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public required string Email { get; set; }

        public List<Ownership> Units { get; set; } = new();
    }
}
