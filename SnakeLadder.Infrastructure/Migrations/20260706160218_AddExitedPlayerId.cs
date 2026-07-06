using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SnakeLadder.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddExitedPlayerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ExitedPlayerId",
                table: "Games",
                type: "uuid",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExitedPlayerId",
                table: "Games");
        }
    }
}
