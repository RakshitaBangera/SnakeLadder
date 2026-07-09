namespace SnakeLadder.Application.Features.Games.GetGameState;

public class PlayerResponse
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Position { get; set; }

    public int PlayerOrder { get; set; }
}