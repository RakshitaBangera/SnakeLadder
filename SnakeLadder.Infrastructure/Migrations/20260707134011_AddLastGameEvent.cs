using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SnakeLadder.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLastGameEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LastEventId",
                table: "Games",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastEventMessage",
                table: "Games",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastEventId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "LastEventMessage",
                table: "Games");
        }
    }
}
