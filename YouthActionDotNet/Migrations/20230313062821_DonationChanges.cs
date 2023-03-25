using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YouthActionDotNet.Migrations
{
    /// <inheritdoc />
    public partial class DonationChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Donations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ItemDescription",
                table: "Donations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "Donations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemQuantity",
                table: "Donations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "Donations",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "ItemDescription",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "ItemQuantity",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Donations");
        }
    }
}
