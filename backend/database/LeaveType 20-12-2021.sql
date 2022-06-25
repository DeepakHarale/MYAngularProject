USE [atopdin_atdms]
GO
/****** Object:  Table [dbo].[LeaveType]    Script Date: 20-12-2021 6.34.49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveType](
	[LeaveId] [int] NOT NULL,
	[LeaveName] [nvarchar](50) NULL,
	[AssignedDays] [int] NULL,
 CONSTRAINT [PK_LeaveType] PRIMARY KEY CLUSTERED 
(
	[LeaveId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (1, N'Earned Leave', 12)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (2, N'Casual Leave/Sick Leave', 6)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (3, N'Leave Without Pay', 0)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (4, N'Birthday Leave', 1)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (5, N'Annivarsary Leave', 1)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (6, N'Compensatory Off', 0)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (7, N'Matternity Leave', 182)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (8, N'Paternity', 3)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (9, N'Miscariage', 14)
GO
INSERT [dbo].[LeaveType] ([LeaveId], [LeaveName], [AssignedDays]) VALUES (10, N'Adoption/Surrogacy', 56)
GO
ALTER TABLE [dbo].[LeaveType] ADD  CONSTRAINT [DF_LeaveType_TotalLeaveDays]  DEFAULT ((0)) FOR [AssignedDays]
GO
