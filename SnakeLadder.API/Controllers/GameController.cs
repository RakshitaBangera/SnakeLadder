using Microsoft.AspNetCore.Mvc;
using SnakeLadder.Domain.Entities;
using SnakeLadder.Infrastructure.Persistence;

namespace SnakeLadder.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly AppDbContext _context;

    public GameController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("create")]
    public IActionResult CreateGame()
    {
        var game = new Game
        {
            Id = Guid.NewGuid(),
            RoomCode = Guid.NewGuid().ToString("N")[..6].ToUpper(),
            Status = "Waiting",
            CreatedAt = DateTime.UtcNow
        };

        _context.Games.Add(game);
        _context.SaveChanges();

        return Ok(new
        {
            game.Id,
            game.RoomCode,
            game.Status
        });
    }
}