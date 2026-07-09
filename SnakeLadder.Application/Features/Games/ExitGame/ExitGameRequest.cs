namespace SnakeLadder.Application.Features.Games.ExitGame;

public class ExitGameRequest
{
    public Guid GameId { get; set; }

    public Guid PlayerId { get; set; }
}