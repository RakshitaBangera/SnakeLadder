namespace SnakeLadder.Domain.Entities;

public class Game
{
    public Guid Id { get; set; }
    public string RoomCode { get; set; }
    public string Status { get; set; } // Waiting, Playing, Finished
    public Guid? WinnerId { get; set; }
    public DateTime CreatedAt { get; set; }
}