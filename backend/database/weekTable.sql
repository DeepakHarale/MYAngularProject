USE [atdms]
GO

/****** Object:  Table [dbo].[WeeklyTimeSheet]    Script Date: 15-11-2021 9.55.56 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[WeeklyTimeSheet](
	[TimeSheetID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectsTaskId] [int] NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[WeekNo] [int] NOT NULL,
	[Mondayhr] [float] NOT NULL,
	[MondayDescription] [nvarchar](50) NULL,
	[MondayDate] [date] NOT NULL,
	[Tuesdayhr] [float] NULL,
	[TuesdayDescription] [nvarchar](50) NULL,
	[TuesdayDate] [date] NOT NULL,
	[Wednesdayhr] [float] NULL,
	[WednesdayDescription] [nvarchar](50) NULL,
	[WednesdayDate] [date] NOT NULL,
	[Thursdayhr] [float] NULL,
	[ThursdayDescription] [nvarchar](50) NULL,
	[ThursdayDate] [date] NOT NULL,
	[Fridayhr] [float] NULL,
	[FridayDescription] [nvarchar](50) NULL,
	[FridayDate] [date] NOT NULL,
	[Saturdayhr] [float] NULL,
	[SaturdayDescription] [nvarchar](50) NULL,
	[SaturdayDate] [date] NOT NULL,
	[Sundayhr] [float] NULL,
	[SundayDescription] [nvarchar](50) NULL,
	[SundayDate] [date] NOT NULL,
	[createdBy] [nvarchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[Status] [nvarchar](50) NULL,
 CONSTRAINT [PK_WeeklyTimeSheet] PRIMARY KEY CLUSTERED 
(
	[TimeSheetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


