using Microsoft.EntityFrameworkCore;
using Proyecto_1.Data;
using Proyecto_1.DTO;
using Proyecto_1.Entities;
using Proyecto_1.Interfaces;

namespace Proyecto_1.Services
{
    public class UnitService : IUnitService
    {
        private readonly ApplicationDbContext _context;

        public UnitService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateUnitAsync(CreateUnitDTO dto)
        {
            bool exists = await _context.Units
                .AnyAsync(u => u.Number == dto.Number && u.Address == dto.Address);

            if (exists)
                throw new Exception("Dirección y número de unidad ya existen dentro del sistema");

            var unit = new Unit
            {
                Number = dto.Number,
                Address = dto.Address,
                Orientation = dto.Orientation,
                Bedrooms = dto.Bedrooms,
                Bathrooms = dto.Bathrooms,
                Model = dto.Model,
                RentPrice = dto.RentPrice,
                CommonExpense = dto.CommonExpense
            };

            _context.Units.Add(unit);
            await _context.SaveChangesAsync();
            

        }
        public async Task<List<UnitDTO>> GetAllUnitsAsync()
        {
            return await _context.Units
                .Select(u => new UnitDTO
                {
                    Id = u.Id,
                    Number = u.Number,
                    Address = u.Address,
                    Orientation = u.Orientation,
                    Bedrooms = u.Bedrooms,
                    Bathrooms = u.Bathrooms,
                    Model = u.Model,
                    RentPrice = u.RentPrice,
                    CommonExpense = u.CommonExpense
                })
                .ToListAsync();
        }
        public async Task<List<OwnerDTO>> GetOwnersByUnitIdAsync(int unitId)
        {
            var owners = await _context.Ownerships
                .Where(o => o.UnitId == unitId)
                .Include(o => o.Owner)
                .Select(o => new OwnerDTO
                {
                    Rut = o.Owner.Rut,
                    Name = o.Owner.Name,
                    BirthDate = o.Owner.BirthDate,
                    Email = o.Owner.Email
                })
                .ToListAsync();

            return owners;
        }

    }
}
