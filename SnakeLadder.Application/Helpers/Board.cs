namespace SnakeLadder.Application.Helpers;

public static class Board
{
    public static readonly Dictionary<int, int> SnakesAndLadders = new()
{
    // Ladders
    {17, 76},
    {26, 67},
    {43, 76},
    {59, 79},
    {71, 90},

    // Snakes
    {30, 8},
    {34, 13},
    {45, 19},
    {56, 23},
    {73, 51},
    {82, 42},
    {98, 55},
    {92, 68}
};
}