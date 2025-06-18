namespace Proyecto_1.Entities
{
    public class Ownership
    {
        public int OwnerId { get; set; }
        public Owner Owner { get; set; }

        public int UnitId { get; set; }
        public Unit Unit { get; set; }

        public decimal OwnershipPercentage { get; set; }
    }
}
