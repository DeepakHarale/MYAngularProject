USE [atdms]
GO

/****** Object:  Table [dbo].[PermissionMaster]    Script Date: 01-12-2021 10:25:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PermissionMaster](
	[PermissionId] [int] IDENTITY(1,1) NOT NULL,
	[Permission Name] [nchar](10) NOT NULL,
	[IsActive] [int] NOT NULL,
 CONSTRAINT [PK_PermissionMaster] PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


INSERT INTO [dbo].[PermissionMaster]  ([Permission Name],[IsActive]) VALUES ('Add' ,1)
  INSERT INTO [dbo].[PermissionMaster]  ([Permission Name],[IsActive]) VALUES ('Edit' ,1)
  INSERT INTO [dbo].[PermissionMaster]  ([Permission Name],[IsActive]) VALUES ('Delete' ,1)
  INSERT INTO [dbo].[PermissionMaster]  ([Permission Name],[IsActive]) VALUES ('View' ,1)

