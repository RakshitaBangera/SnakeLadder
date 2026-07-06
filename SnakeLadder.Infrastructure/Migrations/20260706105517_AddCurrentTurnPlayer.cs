using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SnakeLadder.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCurrentTurnPlayer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CurrentTurnPlayerId",
                table: "Games",
                type: "uuid",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentTurnPlayerId",
                table: "Games");
        }
    }
}
