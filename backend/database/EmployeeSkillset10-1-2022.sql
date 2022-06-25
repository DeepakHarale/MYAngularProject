USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[EmployeeSkillSet]    Script Date: 10-01-2022 15:07:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[EmployeeSkillSet](
	[SkillId] [int] IDENTITY(1,1) NOT NULL,
	[SkillDescription] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_EmployeeSkillSet] PRIMARY KEY CLUSTERED 
(
	[SkillId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


