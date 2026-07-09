namespace SnakeLadder.Application.Features.Games.JoinGame;

public class JoinGameRequest
{
    public string RoomCode { get; set; } = string.Empty;

    public string PlayerName { get; set; } = string.Empty;
}