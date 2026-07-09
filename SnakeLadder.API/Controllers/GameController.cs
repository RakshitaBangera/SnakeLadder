using Microsoft.AspNetCore.Mvc;
using SnakeLadder.Domain.Entities;
using SnakeLadder.Infrastructure.Persistence;
using SnakeLadder.Application.Features.Games.CreateGame;
using SnakeLadder.Application.Features.Games.JoinGame;
using Microsoft.EntityFrameworkCore;
using SnakeLadder.Application.Features.Games.GetGameState;
using SnakeLadder.Application.Features.Games.RollDice;
using SnakeLadder.Application.Helpers;
using SnakeLadder.Application.Features.Games.ExitGame;

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
            Position = 1,
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
            Position = 1,
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
            Id = p.Id,
            Name = p.Name,
            Position = p.Position,
            PlayerOrder = p.PlayerOrder
        })
        .ToList();

    // ✅ GET CURRENT TURN PLAYER NAME
    var currentTurnPlayerName = players
        .FirstOrDefault(p => p.Id == game.CurrentTurnPlayerId)?.Name;

    var response = new GameStateResponse
    {
        GameId = game.Id,
        RoomCode = game.RoomCode,
        Status = game.Status,
        CurrentTurnPlayerId = game.CurrentTurnPlayerId,
        CurrentTurnPlayerName = currentTurnPlayerName, // 🔥 THIS WAS MISSING
        WinnerId = game.WinnerId,
        Players = players,
        ExitedPlayerId = game.ExitedPlayerId,
        LastEventId = game.LastEventId,
        LastEventMessage = game.LastEventMessage,
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
    string moveType = "Normal";

int snakeOrLadderStart = newPosition;
int snakeOrLadderEnd = newPosition;

if (Board.SnakesAndLadders.TryGetValue(newPosition, out var finalPosition))
{
    snakeOrLadderEnd = finalPosition;

    if (finalPosition > newPosition)
    {
        moveType = "Ladder";
    }
    else
    {
        moveType = "Snake";
    }

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
    // Change turn only if the game is still running
    // and the player didn't roll a 6
    if (game.Status != "Finished" && dice != 6)
    {
        var otherPlayer = _context.Players.FirstOrDefault(p =>
            p.GameId == game.Id &&
            p.Id != player.Id);

        if (otherPlayer != null)
        {
            game.CurrentTurnPlayerId = otherPlayer.Id;
        }
    }
    if (moveType == "Ladder")
{
    game.LastEventMessage =
        $"🪜 {player.Name} climbed a ladder from {snakeOrLadderStart} → {snakeOrLadderEnd}";
}
else if (moveType == "Snake")
{
    game.LastEventMessage =
        $"🐍 {player.Name} was swallowed by a snake from {snakeOrLadderStart} → {snakeOrLadderEnd}";
}
else if (game.Status == "Finished")
{
    game.LastEventMessage =
        $"🏆 {player.Name} won the game!";
}
else if (dice == 6)
{
    game.LastEventMessage =
        $"🎲 {player.Name} rolled a 6! Play again!";
}
else
{
    game.LastEventMessage =
        $"🎲 {player.Name} rolled a {dice}";
}

game.LastEventId = Guid.NewGuid();
    _context.SaveChanges();
    
        var response = new RollDiceResponse
    {
        Dice = dice,
        OldPosition = oldPosition,
        NewPosition = newPosition,
        NextPlayerId = game.CurrentTurnPlayerId ?? Guid.Empty,
        GameStatus = game.Status,
        MoveType = moveType
    };
     string message;

if (game.Status == "Finished")
{
    message = "🎉 Congratulations! You won the game!";
}
else if (oldPosition == newPosition && dice + oldPosition > 100)
{
    message = "🎯 You need an exact roll to reach 100.";
}
else if (dice == 6)
{
    message = "🎲 You rolled a 6! Play again.";
}
else
{
    message = $"🎲 You rolled a {dice}.";
}
        return Ok(new
    {
        Success = true,
        Message = message,
        Data = response
    });

}
[HttpPost("exit")]
public IActionResult ExitGame([FromBody] ExitGameRequest request)
{
    var game = _context.Games.FirstOrDefault(g => g.Id == request.GameId);

    if (game == null)
    {
        return NotFound(new ExitGameResponse
        {
            Success = false,
            Message = "Game not found."
        });
    }

    game.Status = "Finished";
game.ExitedPlayerId = request.PlayerId;

    _context.SaveChanges();

    return Ok(new ExitGameResponse
    {
        Success = true,
        Message = "Player exited the game."
    });
}

}