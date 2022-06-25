USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[EmpInfo]    Script Date: 10-01-2022 14:45:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[EmpInfo](
	[EmpInfoId] [int] IDENTITY(1,1) NOT NULL,
	[EmpId] [int] NOT NULL,
	[BloodGroup] [nvarchar](10) NULL,
	[Anniversary] [datetime] NULL,
	[SkillSet] [nvarchar](50) NOT NULL,
	[EmgContNo] [nvarchar](50) NOT NULL,
	[PersonalEmail] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_EmpInfo] PRIMARY KEY CLUSTERED 
(
	[EmpInfoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


