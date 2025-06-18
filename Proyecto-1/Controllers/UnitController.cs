using Microsoft.AspNetCore.Mvc;
using Proyecto_1.DTO;
using Proyecto_1.Interfaces;

namespace Proyecto_1.Controllers
{
    [ApiController]
    [Route("api/units")]
    public class UnitController : ControllerBase
    {
        private readonly IUnitService _unitService;

        public UnitController(IUnitService unitService)
        {
            _unitService = unitService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUnitDTO dto)
        {
            try
            {
                await _unitService.CreateUnitAsync(dto);
                return Ok("Unit created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<UnitDTO>>> GetAll()
        {
            var units = await _unitService.GetAllUnitsAsync();
            return Ok(units);
        }

        [HttpGet("{id}/owners")]
        public async Task<ActionResult<List<OwnerDTO>>> GetOwnersByUnitId(int id)
        {
            var owners = await _unitService.GetOwnersByUnitIdAsync(id);

            if (owners == null || !owners.Any())
                return NotFound($"No se encontraron propietarios para unidad con id {id}.");

            return Ok(owners);
        }

    }


}
