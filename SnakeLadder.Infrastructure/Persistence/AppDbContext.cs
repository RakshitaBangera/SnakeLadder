using Microsoft.EntityFrameworkCore;
using SnakeLadder.Domain.Entities;

namespace SnakeLadder.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Game> Games { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Move> Moves { get; set; }
}