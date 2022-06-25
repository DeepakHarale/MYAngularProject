USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[OfficialDocument]    Script Date: 01-02-2022 11:42:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[OfficialDocument](
	[DocumentId] [int] IDENTITY(1,1) NOT NULL,
	[ReferenceNo] [nvarchar](50) NULL,
	[DocumentName] [nvarchar](50) NULL,
	[EmployeeName] [nvarchar](50) NULL,
	[Designation] [nvarchar](50) NULL,
	[DocumentDate] [datetime] NULL,
	[CTC] [int] NULL,
	[EmailId] [nvarchar](50) NULL,
	[MobileNo] [nvarchar](50) NULL,
	[Status] [nvarchar](50) NULL,
 CONSTRAINT [PK_OfficialDocument] PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


ALTER TABLE OfficialDocument
ALTER COLUMN CTC float

Alter Table officialDocument 
Alter column MobileNo nvarchar(50)

Alter table officialDocument
Add  Status nvarchar(50)