using Proyecto_1.DTO;

namespace Proyecto_1.Interfaces
{
    public interface IUnitService
    {
        Task CreateUnitAsync(CreateUnitDTO dto);
        Task<List<UnitDTO>> GetAllUnitsAsync();
        Task<List<OwnerDTO>> GetOwnersByUnitIdAsync(int unitId);
    }
}
