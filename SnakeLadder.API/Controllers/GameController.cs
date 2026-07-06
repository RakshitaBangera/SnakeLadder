using Microsoft.AspNetCore.Mvc;
using SnakeLadder.Domain.Entities;
using SnakeLadder.Infrastructure.Persistence;
using SnakeLadder.Application.Features.Games.CreateGame;
using SnakeLadder.Application.Features.Games.JoinGame;
using Microsoft.EntityFrameworkCore;
using SnakeLadder.Application.Features.Games.GetGameState;
using SnakeLadder.Application.Features.Games.RollDice;
using SnakeLadder.Application.Helpers;

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
    public IActionResult CreateGame([FromBody] CreateGameRequest request)
    {
        var game = new Game
        {
            Id = Guid.NewGuid(),
            RoomCode = Guid.NewGuid().ToString("N")[..6].ToUpper(),
            Status = "Waiting",
            CreatedAt = DateTime.UtcNow
        };

        _context.Games.Add(game);

        var player = new Player
        {
            Id = Guid.NewGuid(),
            GameId = game.Id,
            Name = request.PlayerName,
            Position = 0,
            PlayerOrder = 1
        };

        _context.Players.Add(player);
        game.CurrentTurnPlayerId = player.Id;

        _context.SaveChanges();

        var response = new CreateGameResponse
        {
            GameId = game.Id,
            PlayerId = player.Id,
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

        if (playerCount == 1)
        {
            game.Status = "InProgress";
        }

        _context.SaveChanges();

            var response = new JoinGameResponse
            {
                GameId = game.Id,
                PlayerId = player.Id,
                Message = "Joined successfully!"
            };

            return Ok(response);
    }
    [HttpGet("{roomCode}")]
    public IActionResult GetGameState(string roomCode)
    {
        var game = _context.Games
            .FirstOrDefault(g => g.RoomCode == roomCode);

        if (game == null)
        {
            return NotFound("Game not found.");
        }

        var players = _context.Players
            .Where(p => p.GameId == game.Id)
            .OrderBy(p => p.PlayerOrder)
            .Select(p => new PlayerResponse
            {
                Name = p.Name,
                Position = p.Position,
                PlayerOrder = p.PlayerOrder
            })
            .ToList();

        var response = new GameStateResponse
        {
            RoomCode = game.RoomCode,
            Status = game.Status,
            Players = players
        };

        return Ok(response);
    }
    [HttpPost("roll")]
public IActionResult RollDice([FromBody] RollDiceRequest request)
{

    var game = _context.Games.FirstOrDefault(g => g.Id == request.GameId);

    if (game == null)
    {
        return NotFound(new
{
    Success = false,
    Message = "Game not found."
});
    }
    if (game.Status == "Finished")
{
    return BadRequest(new
    {
        Success = false,
        Message = "The game has already finished."
    });
}

    var player = _context.Players.FirstOrDefault(p =>
        p.Id == request.PlayerId &&
        p.GameId == request.GameId);

    if (player == null)
    {
        return NotFound(new
{
    Success = false,
    Message = "Player not found."
});
    }

    if (game.CurrentTurnPlayerId != player.Id)
    {
        return BadRequest(new
{
    Success = false,
    Message = "It is not your turn."
});
    }

    var dice = Random.Shared.Next(1, 7);
    var oldPosition = player.Position;
var newPosition = oldPosition + dice;

// Player must land exactly on 100
if (newPosition > 100)
{
    newPosition = oldPosition;
}

// Check for snake or ladder
if (Board.SnakesAndLadders.TryGetValue(newPosition, out var finalPosition))
{
    newPosition = finalPosition;
}

player.Position = newPosition;
if (newPosition == 100)
{
    game.Status = "Finished";
    game.WinnerId = player.Id;
}
    var move = new Move
    {
        Id = Guid.NewGuid(),
        GameId = game.Id,
        PlayerId = player.Id,
        Dice = dice,
        OldPosition = oldPosition,
        NewPosition = newPosition,
        Time = DateTime.UtcNow
    };

    _context.Moves.Add(move);
    var otherPlayer = _context.Players.FirstOrDefault(p =>
    p.GameId == game.Id &&
    p.Id != player.Id);
    
    if (game.Status != "Finished" && otherPlayer != null)
{
    game.CurrentTurnPlayerId = otherPlayer.Id;
}
    _context.SaveChanges();
    
    var response = new RollDiceResponse
        {
            Dice = dice,
            OldPosition = oldPosition,
            NewPosition = newPosition,
            NextPlayerId = game.CurrentTurnPlayerId ?? Guid.Empty,
            GameStatus = game.Status
        };
        string message;

if (game.Status == "Finished")
{
    message = "🎉 Congratulations! You won the game!";
}
else if (oldPosition == newPosition && dice + oldPosition > 100)
{
    message = "You need an exact roll to reach 100.";
}
else
{
    message = $"You rolled a {dice}.";
}
        return Ok(new
{
    Success = true,
    Message = message,
    Data = response
});
}


}