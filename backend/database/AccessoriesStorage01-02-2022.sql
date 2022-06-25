USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[AccessoriesStorage]    Script Date: 01-02-2022 12:18:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AccessoriesStorage](
	[AccessoriesId] [int] IDENTITY(1,1) NOT NULL,
	[AccessoriesName] [nvarchar](50) NULL,
	[AccessoriesStorage] [nvarchar](50) NULL,
 CONSTRAINT [PK_AccessoriesStorage] PRIMARY KEY CLUSTERED 
(
	[AccessoriesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


