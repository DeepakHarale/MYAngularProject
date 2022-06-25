USE [atdms]
GO

/****** Object:  Table [dbo].[Modules]    Script Date: 01-12-2021 10:06:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Modules](
	[ModuleId] [int] IDENTITY(1,1) NOT NULL,
	[ParentModuleId] [int] NULL,
	[ModuleName] [nchar](50) NULL,
	[ModuleDesc] [nchar](100) NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [int] NULL,
	[IsActive] [int] NULL,
 CONSTRAINT [PK_Modules] PRIMARY KEY CLUSTERED 
(
	[ModuleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


