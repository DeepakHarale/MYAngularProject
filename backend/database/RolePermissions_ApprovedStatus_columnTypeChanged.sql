/*
   29 December 202110:52:05
   User: 
   Server: DESKTOP-4A40BO0
   Database: atdms
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.RolePermissions
	DROP CONSTRAINT DF_RolePermissions_ApprvedStatus
GO
ALTER TABLE dbo.RolePermissions
	DROP CONSTRAINT DF_RolePermissions_IsActive
GO
CREATE TABLE dbo.Tmp_RolePermissions
	(
	RolePermissionId int NOT NULL,
	RoleId int NOT NULL,
	ModuleId int NOT NULL,
	PermissionId int NOT NULL,
	ApprvedStatus bit NOT NULL,
	IsActive bit NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_RolePermissions SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_RolePermissions ADD CONSTRAINT
	DF_RolePermissions_ApprvedStatus DEFAULT ((1)) FOR ApprvedStatus
GO
ALTER TABLE dbo.Tmp_RolePermissions ADD CONSTRAINT
	DF_RolePermissions_IsActive DEFAULT ((1)) FOR IsActive
GO
IF EXISTS(SELECT * FROM dbo.RolePermissions)
	 EXEC('INSERT INTO dbo.Tmp_RolePermissions (RolePermissionId, RoleId, ModuleId, PermissionId, ApprvedStatus, IsActive)
		SELECT RolePermissionId, RoleId, ModuleId, PermissionId, CONVERT(bit, ApprvedStatus), CONVERT(bit, IsActive) FROM dbo.RolePermissions WITH (HOLDLOCK TABLOCKX)')
GO
DROP TABLE dbo.RolePermissions
GO
EXECUTE sp_rename N'dbo.Tmp_RolePermissions', N'RolePermissions', 'OBJECT' 
GO
ALTER TABLE dbo.RolePermissions ADD CONSTRAINT
	PK_RolePermissions PRIMARY KEY CLUSTERED 
	(
	RolePermissionId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT
