using Microsoft.EntityFrameworkCore;
using Proyecto_1.Data;
using Proyecto_1.DTO;
using Proyecto_1.Entities;
using Proyecto_1.Interfaces;

public class OwnerService : IOwnerService
{
    private readonly ApplicationDbContext _context;

    public OwnerService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateOwnerAndAssignUnitAsync(CreateOwnerDTO dto, int unitId, decimal ownershipPercentage)
    {
        var unit = await _context.Units
            .Include(u => u.Owners)
            .FirstOrDefaultAsync(u => u.Id == unitId);

        if (unit == null)
            throw new Exception("La unidad no existe");

        var currentPercentage = unit.Owners.Sum(owner => owner.OwnershipPercentage);

        if (currentPercentage + ownershipPercentage > 100)
            throw new Exception($"No es posible registrar el propietario a unidad con id {unit.Id}. La unidad se encuentra dividida en máximo permitido.");

        var owner = new Owner
        {
            Rut = dto.Rut,
            Name = dto.Name,
            BirthDate = dto.BirthDate,
            Email = dto.Email
        };

        var ownership = new Ownership
        {
            Owner = owner,
            Unit = unit,
            OwnershipPercentage = ownershipPercentage
        };

        _context.Owners.Add(owner);
        _context.Ownerships.Add(ownership);

        await _context.SaveChangesAsync();
    }
    public async Task<List<OwnerDTO>> GetAllOwnersAsync()
    {
        return await _context.Owners
            .Select(owner => new OwnerDTO
            {
                Id = owner.Id,
                Rut = owner.Rut,
                Name = owner.Name,
                BirthDate = owner.BirthDate,
                Email = owner.Email
            })
            .ToListAsync();
    }
    public async Task<List<UnitDTO>> GetUnitsByOwnerIdAsync(int ownerId)
    {
        var units = await _context.Ownerships
            .Where(o => o.OwnerId == ownerId)
            .Include(o => o.Unit)
            .Select(o => new UnitDTO
            {
                Number = o.Unit.Number,
                Address = o.Unit.Address,
                Orientation = o.Unit.Orientation,
                Bedrooms = o.Unit.Bedrooms,
                Bathrooms = o.Unit.Bathrooms,
                Model = o.Unit.Model,
                RentPrice = o.Unit.RentPrice,
                CommonExpense = o.Unit.CommonExpense
            })
            .ToListAsync();

        return units;
    }

}
