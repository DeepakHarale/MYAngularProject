

GO
/****** Object:  Table [dbo].[Document_Type]    Script Date: 10-08-2021 11.15.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Document_Type](
	[DocumentId] [int] NOT NULL,
	[DocumentName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Document_Type] PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DocumentDetails]    Script Date: 10-08-2021 11.15.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentDetails](
	[DocumentId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[DocumentTypeId] [int] NULL,
	[DocumentName] [nvarchar](100) NULL,
	[UniversityName] [nvarchar](150) NULL,
	[Percentage] [float] NULL,
	[PassYear] [int] NULL,
	[DocumentPath] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
 CONSTRAINT [PK_DocumentDetails] PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EmployeeDetails]    Script Date: 10-08-2021 11.15.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeDetails](
	[EmployeeId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[EmpoyeeNo] [nvarchar](50) NULL,
	[EmployeeName] [nvarchar](max) NULL,
	[MobileNo] [nvarchar](50) NULL,
	[EmailId] [nvarchar](50) NULL,
	[CurrentAddress] [nvarchar](150) NULL,
	[PermanentAddress] [nvarchar](150) NULL,
	[ProfilePhotoPath] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
 CONSTRAINT [PK_EmployeeDetails_1] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RoleMaster]    Script Date: 10-08-2021 11.15.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoleMaster](
	[RoleId] [int] NOT NULL,
	[RoleName] [nvarchar](max) NULL,
 CONSTRAINT [PK_RollMaster] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserDetails]    Script Date: 10-08-2021 11.15.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetails](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
 CONSTRAINT [PK_UserDetails] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserRoleMappingDetails]    Script Date: 10-08-2021 11.15.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoleMappingDetails](
	[UserRoleMapId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[RoleId] [int] NULL,
 CONSTRAINT [PK_UserRoleMappingDetails] PRIMARY KEY CLUSTERED 
(
	[UserRoleMapId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[Document_Type] ([DocumentId], [DocumentName]) VALUES (1, N'SSC')
GO
INSERT [dbo].[Document_Type] ([DocumentId], [DocumentName]) VALUES (2, N'HSC')
GO
INSERT [dbo].[Document_Type] ([DocumentId], [DocumentName]) VALUES (3, N'Graduation')
GO
SET IDENTITY_INSERT [dbo].[DocumentDetails] ON 

GO
INSERT [dbo].[DocumentDetails] ([DocumentId], [EmployeeId], [DocumentTypeId], [DocumentName], [UniversityName], [Percentage], [PassYear], [DocumentPath], [CreatedAt], [UpdatedAt]) VALUES (2, 1, 1, N'10th', N'PUNe', 90, 2015, N'Resources/1/ccbe442e-fbc2-47c9-a4fb-6b15fecbaddb.png', NULL, NULL)
GO
INSERT [dbo].[DocumentDetails] ([DocumentId], [EmployeeId], [DocumentTypeId], [DocumentName], [UniversityName], [Percentage], [PassYear], [DocumentPath], [CreatedAt], [UpdatedAt]) VALUES (3, 1, 2, N'12th', N'Pune', 50, 2018, N'Resources/1/7ba3c99c-84a4-4e4a-9ac3-5efa27b4d2da.png', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[DocumentDetails] OFF
GO
INSERT [dbo].[EmployeeDetails] ([EmployeeId], [UserId], [EmpoyeeNo], [EmployeeName], [MobileNo], [EmailId], [CurrentAddress], [PermanentAddress], [ProfilePhotoPath], [CreatedAt], [UpdatedAt]) VALUES (1, 1, NULL, N'Sanjay Rane', N'8975317596', N'sanjayrane195@gmail.com', NULL, NULL, NULL, CAST(N'2021-08-09 10:31:59.853' AS DateTime), NULL)
GO
INSERT [dbo].[EmployeeDetails] ([EmployeeId], [UserId], [EmpoyeeNo], [EmployeeName], [MobileNo], [EmailId], [CurrentAddress], [PermanentAddress], [ProfilePhotoPath], [CreatedAt], [UpdatedAt]) VALUES (2, 2, NULL, N'Sanjay Rane', N'8975317588', N'sanjayrane@gmail.com', NULL, NULL, NULL, CAST(N'2021-08-09 16:40:21.633' AS DateTime), NULL)
GO
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName]) VALUES (1, N'SUPERADMIN')
GO
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName]) VALUES (2, N'ADMIN')
GO
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName]) VALUES (3, N'USER')
GO
SET IDENTITY_INSERT [dbo].[UserDetails] ON 

GO
INSERT [dbo].[UserDetails] ([UserId], [UserName], [Password], [CreatedAt]) VALUES (1, N'sanjayrane195@gmail.com', N'5l48X1ZTcgm7cxIk0M3dqvMpFJ51RuCplQsWNpP0dq4=', CAST(N'2021-08-09 10:31:59.760' AS DateTime))
GO
INSERT [dbo].[UserDetails] ([UserId], [UserName], [Password], [CreatedAt]) VALUES (2, N'sanjayrane@gmail.com', N'mHxqsN5df1UQR7yZUuN4ag==', CAST(N'2021-08-09 16:40:21.593' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[UserDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[UserRoleMappingDetails] ON 

GO
INSERT [dbo].[UserRoleMappingDetails] ([UserRoleMapId], [UserId], [RoleId]) VALUES (1, 1, 2)
GO
INSERT [dbo].[UserRoleMappingDetails] ([UserRoleMapId], [UserId], [RoleId]) VALUES (2, 2, 3)
GO
SET IDENTITY_INSERT [dbo].[UserRoleMappingDetails] OFF
GO
