namespace SnakeLadder.Domain.Entities;

public class Move
{
    public Guid Id { get; set; }
    public Guid GameId { get; set; }
    public Guid PlayerId { get; set; }

    public int Dice { get; set; }
    public int OldPosition { get; set; }
    public int NewPosition { get; set; }
    public DateTime Time { get; set; }
}