/*
   29 December 202116:49:56
   User: db_a7ad44_hradmin_admin
   Server: SQL5079.site4now.net
   Database: db_a7ad44_hradmin
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
ALTER TABLE dbo.WeeklyTimeSheets ADD
	Reason nvarchar(50) NULL
GO
ALTER TABLE dbo.WeeklyTimeSheets SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
