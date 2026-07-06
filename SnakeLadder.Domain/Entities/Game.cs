namespace SnakeLadder.Domain.Entities;

public class Game
{
    public Guid Id { get; set; }
    public Guid? ExitedPlayerId { get; set; }

    public string RoomCode { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public Guid? WinnerId { get; set; }

    public Guid? CurrentTurnPlayerId { get; set; }

    public DateTime CreatedAt { get; set; }
}