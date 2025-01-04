using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Janus.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddExtraFieldsToAppointmentModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AppointmentCount",
                table: "AppointmentSlots",
                newName: "ConfirmedAppointmentCount");

            migrationBuilder.AddColumn<Guid>(
                name: "ServiceId",
                table: "AppointmentSlots",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Appointments",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentSlots_ServiceId",
                table: "AppointmentSlots",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentSlots_Services_ServiceId",
                table: "AppointmentSlots",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentSlots_Services_ServiceId",
                table: "AppointmentSlots");

            migrationBuilder.DropIndex(
                name: "IX_AppointmentSlots_ServiceId",
                table: "AppointmentSlots");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "AppointmentSlots");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "ConfirmedAppointmentCount",
                table: "AppointmentSlots",
                newName: "AppointmentCount");
        }
    }
}
