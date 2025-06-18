using Microsoft.AspNetCore.Mvc;
using Proyecto_1.DTO;
using Proyecto_1.Interfaces;

[ApiController]
[Route("api/owners")]
public class OwnerController : ControllerBase
{
    private readonly IOwnerService _ownerService;

    public OwnerController(IOwnerService ownerService)
    {
        _ownerService = ownerService;
    }

   
    [HttpPost("assign-unit")]
    public async Task<IActionResult> CreateOwnerAndAssignUnit(
        [FromBody] CreateOwnerDTO dto,
        [FromQuery] int unitId,
        [FromQuery] decimal ownershipPercentage)
    {
        try
        {
            await _ownerService.CreateOwnerAndAssignUnitAsync(dto, unitId, ownershipPercentage);
            return Ok("Propietario creado con éxito.");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<OwnerDTO>>> GetAll()
    {
        var owners = await _ownerService.GetAllOwnersAsync();
        return Ok(owners);
    }

    [HttpGet("{id}/units")]
    public async Task<ActionResult<List<UnitDTO>>> GetUnitsByOwnerId(int id)
    {
        var units = await _ownerService.GetUnitsByOwnerIdAsync(id);

        if (units == null || !units.Any())
            return NotFound($"No se encontraron unidades para propietario con id {id}.");

        return Ok(units);
    }

}
