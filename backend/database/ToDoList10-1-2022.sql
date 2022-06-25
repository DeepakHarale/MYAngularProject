USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[ToDoList]    Script Date: 10-01-2022 15:09:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ToDoList](
	[ToDoId] [int] IDENTITY(1,1) NOT NULL,
	[EmpId] [int] NULL,
	[Description] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_ToDoList] PRIMARY KEY CLUSTERED 
(
	[ToDoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


