namespace SnakeLadder.Application.Features.Games.RollDice;

public class RollDiceRequest
{
    public Guid GameId { get; set; }

    public Guid PlayerId { get; set; }
}