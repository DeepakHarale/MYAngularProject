USE [db_a7ad44_hradmin]
GO

/****** Object:  Table [dbo].[InterviewDetails]    Script Date: 11-02-2022 18:06:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[InterviewDetails](
	[candidateId] [int] IDENTITY(1,1) NOT NULL,
	[candidateName] [nvarchar](50) NOT NULL,
	[designation] [nvarchar](50) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[scheduleDate] [datetime] NULL,
	[refralName] [nvarchar](50) NULL,
	[interviewerName] [nvarchar](50) NULL,
	[feedbackByInterviewer] [nvarchar](max) NULL,
 CONSTRAINT [PK_InterviewDetails] PRIMARY KEY CLUSTERED 
(
	[candidateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


