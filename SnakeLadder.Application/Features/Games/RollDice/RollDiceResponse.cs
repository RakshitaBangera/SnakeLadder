namespace SnakeLadder.Application.Features.Games.RollDice;

public class RollDiceResponse
{
    public int Dice { get; set; }
    public string MoveType { get; set; } = "Normal";
    public int OldPosition { get; set; }

    public int NewPosition { get; set; }
    public bool HitSnakeOrLadder { get; set; }

    public string? Event { get; set; }

    public Guid NextPlayerId { get; set; }

    public string GameStatus { get; set; } = string.Empty;
}