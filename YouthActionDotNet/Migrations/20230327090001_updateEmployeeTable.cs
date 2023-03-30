using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YouthActionDotNet.Migrations
{
    /// <inheritdoc />
    public partial class updateEmployeeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ServiceCenterName",
                table: "Employee",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_ServiceCenterName",
                table: "Employee",
                column: "ServiceCenterName");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_ServiceCenter_ServiceCenterName",
                table: "Employee",
                column: "ServiceCenterName",
                principalTable: "ServiceCenter",
                principalColumn: "ServiceCenterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_ServiceCenter_ServiceCenterName",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_ServiceCenterName",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "ServiceCenterName",
                table: "Employee");
        }
    }
}
