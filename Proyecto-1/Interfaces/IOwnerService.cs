using Proyecto_1.DTO;

namespace Proyecto_1.Interfaces
{
    public interface IOwnerService
    {
        Task CreateOwnerAndAssignUnitAsync(CreateOwnerDTO dto, int unitId, decimal ownershipPercentage);
        Task<List<OwnerDTO>> GetAllOwnersAsync();
        Task<List<UnitDTO>> GetUnitsByOwnerIdAsync(int ownerId);
    }
}
