USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[Accessories]    Script Date: 02-02-2022 12:45:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Accessories](
	[AccessoriesId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [nvarchar](150) NULL,
	[DateOfIssues] [datetime] NULL,
	[DateOfReturn] [datetime] NULL,
	[Status] [nvarchar](50) NULL,
	[PhysicalDamageCharge] [float] NULL,
 CONSTRAINT [PK_Accessories] PRIMARY KEY CLUSTERED 
(
	[AccessoriesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


Alter table Accessories add AccessoriesStorageId int



Alter table Accessories Alter column EmployeeId int

Alter table Accessories Alter column Quantity int

drop table Accessories