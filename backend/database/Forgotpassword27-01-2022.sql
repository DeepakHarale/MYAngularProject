USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[Forgotpassword]    Script Date: 27-01-2022 17:30:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Forgotpassword](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Code] [nvarchar](50) NULL,
	[ExpiryTime] [datetime] NULL,
 CONSTRAINT [PK_Forgotpassword] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


