using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RescuedPaws.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedDbSets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnimalData_AnimalSize_SizeID",
                table: "AnimalData");

            migrationBuilder.DropForeignKey(
                name: "FK_AnimalData_AnimalType_TypeID",
                table: "AnimalData");

            migrationBuilder.DropForeignKey(
                name: "FK_AnimalData_Post_PostID",
                table: "AnimalData");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Location_LocationID",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_EventUser_AspNetUsers_UserID",
                table: "EventUser");

            migrationBuilder.DropForeignKey(
                name: "FK_EventUser_Event_EventID",
                table: "EventUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_Event_EventID",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_Post_PostID",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_SuccessStory_SuccessStoryID",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_Town_TownID",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_AspNetUsers_UserID",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_Location_LocationID",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_SuccessStory_AnimalData_AnimalDataID",
                table: "SuccessStory");

            migrationBuilder.DropForeignKey(
                name: "FK_Video_Post_PostID",
                table: "Video");

            migrationBuilder.DropForeignKey(
                name: "FK_Video_SuccessStory_SuccessStoryID",
                table: "Video");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Video",
                table: "Video");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Town",
                table: "Town");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SuccessStory",
                table: "SuccessStory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Post",
                table: "Post");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Location",
                table: "Location");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventUser",
                table: "EventUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Event",
                table: "Event");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalType",
                table: "AnimalType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalSize",
                table: "AnimalSize");

            migrationBuilder.RenameTable(
                name: "Video",
                newName: "Videos");

            migrationBuilder.RenameTable(
                name: "Town",
                newName: "Towns");

            migrationBuilder.RenameTable(
                name: "SuccessStory",
                newName: "SuccessStories");

            migrationBuilder.RenameTable(
                name: "Post",
                newName: "Posts");

            migrationBuilder.RenameTable(
                name: "Location",
                newName: "Locations");

            migrationBuilder.RenameTable(
                name: "EventUser",
                newName: "EventUsers");

            migrationBuilder.RenameTable(
                name: "Event",
                newName: "Events");

            migrationBuilder.RenameTable(
                name: "AnimalType",
                newName: "AnimalTypes");

            migrationBuilder.RenameTable(
                name: "AnimalSize",
                newName: "AnimalSizes");

            migrationBuilder.RenameIndex(
                name: "IX_Video_SuccessStoryID",
                table: "Videos",
                newName: "IX_Videos_SuccessStoryID");

            migrationBuilder.RenameIndex(
                name: "IX_Video_PostID",
                table: "Videos",
                newName: "IX_Videos_PostID");

            migrationBuilder.RenameIndex(
                name: "IX_SuccessStory_AnimalDataID",
                table: "SuccessStories",
                newName: "IX_SuccessStories_AnimalDataID");

            migrationBuilder.RenameIndex(
                name: "IX_Post_UserID",
                table: "Posts",
                newName: "IX_Posts_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Post_LocationID",
                table: "Posts",
                newName: "IX_Posts_LocationID");

            migrationBuilder.RenameIndex(
                name: "IX_Location_TownID",
                table: "Locations",
                newName: "IX_Locations_TownID");

            migrationBuilder.RenameIndex(
                name: "IX_EventUser_EventID",
                table: "EventUsers",
                newName: "IX_EventUsers_EventID");

            migrationBuilder.RenameIndex(
                name: "IX_Event_LocationID",
                table: "Events",
                newName: "IX_Events_LocationID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Videos",
                table: "Videos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Towns",
                table: "Towns",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SuccessStories",
                table: "SuccessStories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Posts",
                table: "Posts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locations",
                table: "Locations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventUsers",
                table: "EventUsers",
                columns: new[] { "UserID", "EventID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Events",
                table: "Events",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalTypes",
                table: "AnimalTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalSizes",
                table: "AnimalSizes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalData_AnimalSizes_SizeID",
                table: "AnimalData",
                column: "SizeID",
                principalTable: "AnimalSizes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalData_AnimalTypes_TypeID",
                table: "AnimalData",
                column: "TypeID",
                principalTable: "AnimalTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalData_Posts_PostID",
                table: "AnimalData",
                column: "PostID",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Locations_LocationID",
                table: "Events",
                column: "LocationID",
                principalTable: "Locations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventUsers_AspNetUsers_UserID",
                table: "EventUsers",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventUsers_Events_EventID",
                table: "EventUsers",
                column: "EventID",
                principalTable: "Events",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Events_EventID",
                table: "Image",
                column: "EventID",
                principalTable: "Events",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Posts_PostID",
                table: "Image",
                column: "PostID",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_SuccessStories_SuccessStoryID",
                table: "Image",
                column: "SuccessStoryID",
                principalTable: "SuccessStories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Towns_TownID",
                table: "Locations",
                column: "TownID",
                principalTable: "Towns",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserID",
                table: "Posts",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Locations_LocationID",
                table: "Posts",
                column: "LocationID",
                principalTable: "Locations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SuccessStories_AnimalData_AnimalDataID",
                table: "SuccessStories",
                column: "AnimalDataID",
                principalTable: "AnimalData",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_Posts_PostID",
                table: "Videos",
                column: "PostID",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_SuccessStories_SuccessStoryID",
                table: "Videos",
                column: "SuccessStoryID",
                principalTable: "SuccessStories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnimalData_AnimalSizes_SizeID",
                table: "AnimalData");

            migrationBuilder.DropForeignKey(
                name: "FK_AnimalData_AnimalTypes_TypeID",
                table: "AnimalData");

            migrationBuilder.DropForeignKey(
                name: "FK_AnimalData_Posts_PostID",
                table: "AnimalData");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Locations_LocationID",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_EventUsers_AspNetUsers_UserID",
                table: "EventUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_EventUsers_Events_EventID",
                table: "EventUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_Events_EventID",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_Posts_PostID",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_SuccessStories_SuccessStoryID",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Towns_TownID",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserID",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Locations_LocationID",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_SuccessStories_AnimalData_AnimalDataID",
                table: "SuccessStories");

            migrationBuilder.DropForeignKey(
                name: "FK_Videos_Posts_PostID",
                table: "Videos");

            migrationBuilder.DropForeignKey(
                name: "FK_Videos_SuccessStories_SuccessStoryID",
                table: "Videos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Videos",
                table: "Videos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Towns",
                table: "Towns");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SuccessStories",
                table: "SuccessStories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Posts",
                table: "Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Locations",
                table: "Locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventUsers",
                table: "EventUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Events",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalTypes",
                table: "AnimalTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalSizes",
                table: "AnimalSizes");

            migrationBuilder.RenameTable(
                name: "Videos",
                newName: "Video");

            migrationBuilder.RenameTable(
                name: "Towns",
                newName: "Town");

            migrationBuilder.RenameTable(
                name: "SuccessStories",
                newName: "SuccessStory");

            migrationBuilder.RenameTable(
                name: "Posts",
                newName: "Post");

            migrationBuilder.RenameTable(
                name: "Locations",
                newName: "Location");

            migrationBuilder.RenameTable(
                name: "EventUsers",
                newName: "EventUser");

            migrationBuilder.RenameTable(
                name: "Events",
                newName: "Event");

            migrationBuilder.RenameTable(
                name: "AnimalTypes",
                newName: "AnimalType");

            migrationBuilder.RenameTable(
                name: "AnimalSizes",
                newName: "AnimalSize");

            migrationBuilder.RenameIndex(
                name: "IX_Videos_SuccessStoryID",
                table: "Video",
                newName: "IX_Video_SuccessStoryID");

            migrationBuilder.RenameIndex(
                name: "IX_Videos_PostID",
                table: "Video",
                newName: "IX_Video_PostID");

            migrationBuilder.RenameIndex(
                name: "IX_SuccessStories_AnimalDataID",
                table: "SuccessStory",
                newName: "IX_SuccessStory_AnimalDataID");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UserID",
                table: "Post",
                newName: "IX_Post_UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_LocationID",
                table: "Post",
                newName: "IX_Post_LocationID");

            migrationBuilder.RenameIndex(
                name: "IX_Locations_TownID",
                table: "Location",
                newName: "IX_Location_TownID");

            migrationBuilder.RenameIndex(
                name: "IX_EventUsers_EventID",
                table: "EventUser",
                newName: "IX_EventUser_EventID");

            migrationBuilder.RenameIndex(
                name: "IX_Events_LocationID",
                table: "Event",
                newName: "IX_Event_LocationID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Video",
                table: "Video",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Town",
                table: "Town",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SuccessStory",
                table: "SuccessStory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Post",
                table: "Post",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Location",
                table: "Location",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventUser",
                table: "EventUser",
                columns: new[] { "UserID", "EventID" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Event",
                table: "Event",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalType",
                table: "AnimalType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalSize",
                table: "AnimalSize",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalData_AnimalSize_SizeID",
                table: "AnimalData",
                column: "SizeID",
                principalTable: "AnimalSize",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalData_AnimalType_TypeID",
                table: "AnimalData",
                column: "TypeID",
                principalTable: "AnimalType",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnimalData_Post_PostID",
                table: "AnimalData",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Location_LocationID",
                table: "Event",
                column: "LocationID",
                principalTable: "Location",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventUser_AspNetUsers_UserID",
                table: "EventUser",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventUser_Event_EventID",
                table: "EventUser",
                column: "EventID",
                principalTable: "Event",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Event_EventID",
                table: "Image",
                column: "EventID",
                principalTable: "Event",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Post_PostID",
                table: "Image",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_SuccessStory_SuccessStoryID",
                table: "Image",
                column: "SuccessStoryID",
                principalTable: "SuccessStory",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Town_TownID",
                table: "Location",
                column: "TownID",
                principalTable: "Town",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_AspNetUsers_UserID",
                table: "Post",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Location_LocationID",
                table: "Post",
                column: "LocationID",
                principalTable: "Location",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SuccessStory_AnimalData_AnimalDataID",
                table: "SuccessStory",
                column: "AnimalDataID",
                principalTable: "AnimalData",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Video_Post_PostID",
                table: "Video",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Video_SuccessStory_SuccessStoryID",
                table: "Video",
                column: "SuccessStoryID",
                principalTable: "SuccessStory",
                principalColumn: "Id");
        }
    }
}
