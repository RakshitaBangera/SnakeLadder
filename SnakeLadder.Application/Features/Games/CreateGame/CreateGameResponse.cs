namespace SnakeLadder.Application.Features.Games.CreateGame;

public class CreateGameResponse
{
    public Guid GameId { get; set; }

    public Guid PlayerId { get; set; }

    public string RoomCode { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}