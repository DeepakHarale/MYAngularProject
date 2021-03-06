USE [atdms]
GO
/****** Object:  Table [dbo].[WeeklyTimeSheet]    Script Date: 01-11-2021 1.25.10 PM ******/
DROP TABLE [dbo].[WeeklyTimeSheet]
GO
/****** Object:  Table [dbo].[ProjectTasks]    Script Date: 01-11-2021 1.25.10 PM ******/
DROP TABLE [dbo].[ProjectTasks]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 01-11-2021 1.25.10 PM ******/
DROP TABLE [dbo].[Projects]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 01-11-2021 1.25.10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[ProjectId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [nvarchar](50) NULL,
	[ProjectDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectTasks]    Script Date: 01-11-2021 1.25.10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectTasks](
	[ProjectsTaskId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectsTaskType] [nvarchar](50) NULL,
	[ProjectId] [int] NOT NULL,
	[ProjectDescription] [nvarchar](max) NULL,
	[Prorities] [int] NULL,
 CONSTRAINT [PK_ProjectTasks] PRIMARY KEY CLUSTERED 
(
	[ProjectsTaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[WeeklyTimeSheet]    Script Date: 01-11-2021 1.25.10 PM ******/
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
SET IDENTITY_INSERT [dbo].[Projects] ON 

GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (1, N'Anaha', N'pending')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (2, N'HRadmin', N'sds')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (3, N'CarService', N'service')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (4, N'abc', N'abc')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (5, N'xyz', N'xyz')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (6, N'pqr', N'pqr')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (7, N'efg', N'efg')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (8, N'tws', N'tes')
GO
INSERT [dbo].[Projects] ([ProjectId], [ProjectName], [ProjectDescription]) VALUES (9, N'tvs', N'tvs')
GO
SET IDENTITY_INSERT [dbo].[Projects] OFF
GO
SET IDENTITY_INSERT [dbo].[ProjectTasks] ON 

GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (1, N'abs', 1, N'abc', 1)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (2, N'dbn', 2, N'mdmd', 2)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (3, N'cnk', 3, N'dmdm', 3)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (4, N'ndn', 3, N'ddn', 4)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (5, N'dkdk', 5, N'mcm', 5)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (6, N'cm m', 5, N'mcm', 6)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (7, N'demm', 4, N'xmx', 7)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (8, N'avx', 4, N'xmm', 8)
GO
INSERT [dbo].[ProjectTasks] ([ProjectsTaskId], [ProjectsTaskType], [ProjectId], [ProjectDescription], [Prorities]) VALUES (9, N'dxnxn', 5, N'cncn', 9)
GO
SET IDENTITY_INSERT [dbo].[ProjectTasks] OFF
GO
SET IDENTITY_INSERT [dbo].[WeeklyTimeSheet] ON 

GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (24, 2, 2, 4, 2.2, N'abcdefg', CAST(N'2012-12-12' AS Date), 2.2, N'ddad', CAST(N'2012-12-12' AS Date), 2, N'dee', CAST(N'2012-12-12' AS Date), 2, N'ddkdk', CAST(N'2012-12-12' AS Date), 5, N'wcdc', CAST(N'2012-12-12' AS Date), 5, N'ddd', CAST(N'2012-12-12' AS Date), 3, N'ddee', CAST(N'2012-12-12' AS Date), N'2012-12-12', CAST(N'2012-12-12 00:00:00.000' AS DateTime), N'deepak')
GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (26, 1, 1, 3, 4, N'abc', CAST(N'2021-10-29' AS Date), 4, N'abc', CAST(N'2021-10-29' AS Date), 4, N'abc', CAST(N'2021-10-29' AS Date), 2, N'abc', CAST(N'2021-10-29' AS Date), 3, N'abc', CAST(N'2021-10-29' AS Date), 4, N'abc', CAST(N'2021-10-29' AS Date), 2, N'abc', CAST(N'2021-10-29' AS Date), N'abc', CAST(N'2021-10-29 06:06:52.237' AS DateTime), N'abc')
GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (1034, 3, 2, 4, 2.2, N'abcdefg', CAST(N'2012-12-12' AS Date), 2.2, N'ddad', CAST(N'2012-12-12' AS Date), 2, N'dee', CAST(N'2012-12-12' AS Date), 2, N'ddkdk', CAST(N'2012-12-12' AS Date), 5, N'wcdc', CAST(N'2012-12-12' AS Date), 5, N'ddd', CAST(N'2012-12-12' AS Date), 3, N'ddee', CAST(N'2012-12-12' AS Date), N'2012-12-12', CAST(N'2012-12-12 00:00:00.000' AS DateTime), N'deepak')
GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (1035, 3, 1, 4, 2.2, N'abcdefg', CAST(N'2012-12-12' AS Date), 2.2, N'ddad', CAST(N'2012-12-12' AS Date), 2, N'dee', CAST(N'2012-12-12' AS Date), 2, N'ddkdk', CAST(N'2012-12-12' AS Date), 5, N'wcdc', CAST(N'2012-12-12' AS Date), 5, N'ddd', CAST(N'2012-12-12' AS Date), 3, N'ddee', CAST(N'2012-12-12' AS Date), N'2012-12-12', CAST(N'2012-12-12 00:00:00.000' AS DateTime), N'deepak')
GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (1036, 3, 3, 4, 2.2, N'abcdefg', CAST(N'2012-12-12' AS Date), 2.2, N'ddad', CAST(N'2012-12-12' AS Date), 2, N'dee', CAST(N'2012-12-12' AS Date), 2, N'ddkdk', CAST(N'2012-12-12' AS Date), 5, N'wcdc', CAST(N'2012-12-12' AS Date), 5, N'ddd', CAST(N'2012-12-12' AS Date), 3, N'ddee', CAST(N'2012-12-12' AS Date), N'2012-12-12', CAST(N'2012-12-12 00:00:00.000' AS DateTime), N'deepak')
GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (1037, 5, 3, 4, 2.2, N'abcdefg', CAST(N'2012-12-12' AS Date), 2.2, N'ddad', CAST(N'2012-12-12' AS Date), 2, N'dee', CAST(N'2012-12-12' AS Date), 2, N'ddkdk', CAST(N'2012-12-12' AS Date), 5, N'wcdc', CAST(N'2012-12-12' AS Date), 5, N'ddd', CAST(N'2012-12-12' AS Date), 3, N'ddee', CAST(N'2012-12-12' AS Date), N'2012-12-12', CAST(N'2012-12-12 00:00:00.000' AS DateTime), N'deepak')
GO
INSERT [dbo].[WeeklyTimeSheet] ([TimeSheetID], [ProjectsTaskId], [EmployeeId], [WeekNo], [Mondayhr], [MondayDescription], [MondayDate], [Tuesdayhr], [TuesdayDescription], [TuesdayDate], [Wednesdayhr], [WednesdayDescription], [WednesdayDate], [Thursdayhr], [ThursdayDescription], [ThursdayDate], [Fridayhr], [FridayDescription], [FridayDate], [Saturdayhr], [SaturdayDescription], [SaturdayDate], [Sundayhr], [SundayDescription], [SundayDate], [createdBy], [CreatedOn], [Status]) VALUES (1038, 4, 2, 4, 2.2, N'abcdefg', CAST(N'2012-12-12' AS Date), 2.2, N'ddad', CAST(N'2012-12-12' AS Date), 2, N'dee', CAST(N'2012-12-12' AS Date), 2, N'ddkdk', CAST(N'2012-12-12' AS Date), 5, N'wcdc', CAST(N'2012-12-12' AS Date), 5, N'ddd', CAST(N'2012-12-12' AS Date), 3, N'ddee', CAST(N'2012-12-12' AS Date), N'2012-12-12', CAST(N'2012-12-12 00:00:00.000' AS DateTime), N'deepak')
GO
SET IDENTITY_INSERT [dbo].[WeeklyTimeSheet] OFF
GO
