namespace SnakeLadder.Application.Features.Games.GetGameState;

public class GameStateResponse
{
    public string RoomCode { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public List<PlayerResponse> Players { get; set; } = new();
}