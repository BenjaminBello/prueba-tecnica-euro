namespace Proyecto_1.Entities
{
    public class Unit
    {
        public int Id { get; set; }
        public required string Address { get; set; }
        public required string Number { get; set; }
        public required string Orientation { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public required string Model { get; set; }
        public decimal RentPrice { get; set; }
        public decimal CommonExpense { get; set; }

        public List<Ownership> Owners { get; set; } = new();
    }
}
