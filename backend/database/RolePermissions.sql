USE [atdms]
GO

/****** Object:  Table [dbo].[RolePermissions]    Script Date: 01-12-2021 10:47:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RolePermissions](
	[RolePermissionId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NOT NULL,
	[ModuleId] [int] NOT NULL,
	[PermissionId] [int] NOT NULL,
	[ApprvedStatus] [int] NOT NULL,
	[IsActive] [int] NOT NULL,
 CONSTRAINT [PK_RolePermissions] PRIMARY KEY CLUSTERED 
(
	[RolePermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[RolePermissions] ADD  CONSTRAINT [DF_RolePermissions_ApprvedStatus]  DEFAULT ((1)) FOR [ApprvedStatus]
GO

ALTER TABLE [dbo].[RolePermissions] ADD  CONSTRAINT [DF_RolePermissions_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

