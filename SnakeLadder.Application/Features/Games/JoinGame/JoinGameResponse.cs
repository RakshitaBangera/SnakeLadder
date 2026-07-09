namespace SnakeLadder.Application.Features.Games.JoinGame;

public class JoinGameResponse
{
    public Guid GameId { get; set; }

    public Guid PlayerId { get; set; }

    public string Message { get; set; } = string.Empty;
}