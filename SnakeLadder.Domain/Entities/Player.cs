namespace SnakeLadder.Domain.Entities;

public class Player
{
    public Guid Id { get; set; }
    public Guid GameId { get; set; }
    public string Name { get; set; }
    public int Position { get; set; } = 0;
    public int PlayerOrder { get; set; } // 1 or 2
}