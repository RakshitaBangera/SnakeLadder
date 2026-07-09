namespace SnakeLadder.Application.Features.Games.GetGameState;

public class GameStateResponse
{
    public Guid GameId { get; set; }

    public string RoomCode { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public Guid? CurrentTurnPlayerId { get; set; }

    public Guid? WinnerId { get; set; }
    public string? CurrentTurnPlayerName { get; set; }
    public Guid? ExitedPlayerId { get; set; }
    public string? LastEventMessage { get; set; }

   public Guid? LastEventId { get; set; }

    public List<PlayerResponse> Players { get; set; } = new();
}