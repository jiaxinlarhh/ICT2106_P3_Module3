using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YouthActionDotNet.Migrations
{
    /// <inheritdoc />
    public partial class Request : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Request",
                columns: table => new
                {
                    RequestId = table.Column<string>(type: "TEXT", nullable: false),
                    RRFDateTime = table.Column<DateTime>(name: "RRF_DateTime", type: "TEXT", nullable: false),
                    RRFresourceType = table.Column<string>(name: "RRF_resourceType", type: "TEXT", nullable: true),
                    RRFreason = table.Column<string>(name: "RRF_reason", type: "TEXT", nullable: true),
                    RRFrequestedBy = table.Column<string>(name: "RRF_requestedBy", type: "TEXT", nullable: true),
                    RRFstatus = table.Column<string>(name: "RRF_status", type: "TEXT", nullable: true),
                    ProjectId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Request", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_Request_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "ProjectId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Request_ProjectId",
                table: "Request",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Request");
        }
    }
}
