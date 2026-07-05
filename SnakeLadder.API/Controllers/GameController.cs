using Microsoft.AspNetCore.Mvc;
using SnakeLadder.Domain.Entities;
using SnakeLadder.Infrastructure.Persistence;
using SnakeLadder.Application.Features.Games.CreateGame;
using SnakeLadder.Application.Features.Games.JoinGame;
using SnakeLadder.Domain.Entities;
using Microsoft.EntityFrameworkCore;

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

        var response = new CreateGameResponse
{
    Id = game.Id,
    RoomCode = game.RoomCode,
    Status = game.Status
};

return Ok(response);
    }
    [HttpPost("join")]
public IActionResult JoinGame([FromBody] JoinGameRequest request)
{
    // Find the game
    var game = _context.Games
        .FirstOrDefault(g => g.RoomCode == request.RoomCode);

    if (game == null)
    {
        return NotFound("Game not found.");
    }

    // Count existing players
    var playerCount = _context.Players
        .Count(p => p.GameId == game.Id);

    if (playerCount >= 2)
    {
        return BadRequest("Game is already full.");
    }

    // Create player
    var player = new Player
    {
        Id = Guid.NewGuid(),
        GameId = game.Id,
        Name = request.PlayerName,
        Position = 0,
        PlayerOrder = playerCount + 1
    };

    _context.Players.Add(player);
    _context.SaveChanges();

    var response = new JoinGameResponse
    {
        GameId = game.Id,
        PlayerId = player.Id,
        Message = "Joined successfully!"
    };

    return Ok(response);
}
}