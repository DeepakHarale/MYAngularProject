--create database atdms
create database atdms

USE [atdms]
GO
/****** Object:  Table [dbo].[Document_Type]    Script Date: 20-10-2021 2.48.37 PM ******/
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
/****** Object:  Table [dbo].[DocumentDetails]    Script Date: 20-10-2021 2.48.37 PM ******/
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
/****** Object:  Table [dbo].[EmployeeDetails]    Script Date: 20-10-2021 2.48.37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeDetails](
	[EmployeeId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[EmployeeNo] [nvarchar](50) NULL,
	[EmployeeName] [nvarchar](max) NULL,
	[MobileNo] [nvarchar](50) NULL,
	[EmailId] [nvarchar](50) NULL,
	[FirstName] [nvarchar](50) NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Gender] [nvarchar](50) NULL,
	[MothersName] [nvarchar](50) NULL,
	[DateOfBirth] [date] NULL,
	[MaritalStatus] [nvarchar](50) NULL,
	[SpouseName] [nvarchar](50) NULL,
	[ChildName1] [nvarchar](50) NULL,
	[ChildName2] [nvarchar](50) NULL,
	[PAddressLine1] [nvarchar](150) NULL,
	[PAddressLine2] [nvarchar](150) NULL,
	[PCity] [nvarchar](150) NULL,
	[PState] [nvarchar](150) NULL,
	[PPincode] [nvarchar](50) NULL,
	[IsSameAddress] [bit] NULL,
	[CAddressLine1] [nvarchar](150) NULL,
	[CAddressLine2] [nvarchar](150) NULL,
	[CCity] [nvarchar](50) NULL,
	[CPState] [nvarchar](50) NULL,
	[CPincode] [nchar](10) NULL,
	[JoiningDate] [date] NULL,
	[Division] [nvarchar](50) NULL,
	[Department] [nvarchar](50) NULL,
	[EmployeeStatus] [nvarchar](50) NULL,
	[ProfilePhotoPath] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
 CONSTRAINT [PK_EmployeeDetails_1] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RoleMaster]    Script Date: 20-10-2021 2.48.37 PM ******/
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
/****** Object:  Table [dbo].[UserDetails]    Script Date: 20-10-2021 2.48.37 PM ******/
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
/****** Object:  Table [dbo].[UserRoleMappingDetails]    Script Date: 20-10-2021 2.48.37 PM ******/
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
INSERT [dbo].[DocumentDetails] ([DocumentId], [EmployeeId], [DocumentTypeId], [DocumentName], [UniversityName], [Percentage], [PassYear], [DocumentPath], [CreatedAt], [UpdatedAt]) VALUES (1, 1, 1, N'Marksheet 10th', N'Pune', 60, 2016, N'Resources/1/d3ef8d54-e97d-46e1-b3a1-06122666bddd.png', CAST(N'2021-08-11 11:53:14.000' AS DateTime), CAST(N'2021-08-11 11:53:14.000' AS DateTime))
GO
INSERT [dbo].[DocumentDetails] ([DocumentId], [EmployeeId], [DocumentTypeId], [DocumentName], [UniversityName], [Percentage], [PassYear], [DocumentPath], [CreatedAt], [UpdatedAt]) VALUES (2, 1, 2, N'TES', N'YEE', 50, 2019, N'Resources/1/67ba31de-6f80-4fb6-9e0a-6d8f3c701f1e.pdf', CAST(N'2021-08-11 17:45:59.000' AS DateTime), CAST(N'2021-08-11 17:45:59.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[DocumentDetails] OFF
GO
INSERT [dbo].[EmployeeDetails] ([EmployeeId], [UserId], [EmployeeNo], [EmployeeName], [MobileNo], [EmailId], [FirstName], [MiddleName], [LastName], [Gender], [MothersName], [DateOfBirth], [MaritalStatus], [SpouseName], [ChildName1], [ChildName2], [PAddressLine1], [PAddressLine2], [PCity], [PState], [PPincode], [IsSameAddress], [CAddressLine1], [CAddressLine2], [CCity], [CPState], [CPincode], [JoiningDate], [Division], [Department], [EmployeeStatus], [ProfilePhotoPath], [CreatedAt], [UpdatedAt]) VALUES (1, 1, N'AT1', N'Sanjay Rane', N'8975317596', N'sanjayrane195@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-08-09 10:31:59.853' AS DateTime), NULL)
GO
INSERT [dbo].[EmployeeDetails] ([EmployeeId], [UserId], [EmployeeNo], [EmployeeName], [MobileNo], [EmailId], [FirstName], [MiddleName], [LastName], [Gender], [MothersName], [DateOfBirth], [MaritalStatus], [SpouseName], [ChildName1], [ChildName2], [PAddressLine1], [PAddressLine2], [PCity], [PState], [PPincode], [IsSameAddress], [CAddressLine1], [CAddressLine2], [CCity], [CPState], [CPincode], [JoiningDate], [Division], [Department], [EmployeeStatus], [ProfilePhotoPath], [CreatedAt], [UpdatedAt]) VALUES (2, 2, N'AT2', N'Sanjay Rane', N'8975317588', N'sanjayrane@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-08-09 16:40:21.633' AS DateTime), NULL)
GO
INSERT [dbo].[EmployeeDetails] ([EmployeeId], [UserId], [EmployeeNo], [EmployeeName], [MobileNo], [EmailId], [FirstName], [MiddleName], [LastName], [Gender], [MothersName], [DateOfBirth], [MaritalStatus], [SpouseName], [ChildName1], [ChildName2], [PAddressLine1], [PAddressLine2], [PCity], [PState], [PPincode], [IsSameAddress], [CAddressLine1], [CAddressLine2], [CCity], [CPState], [CPincode], [JoiningDate], [Division], [Department], [EmployeeStatus], [ProfilePhotoPath], [CreatedAt], [UpdatedAt]) VALUES (3, 3, N'986465', N'Sachin', N'8975317654', N'sachin@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2021-08-12 11:48:32.010' AS DateTime), CAST(N'2021-08-12 11:48:32.010' AS DateTime))
GO
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName]) VALUES (1, N'SUPERADMIN')
GO
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName]) VALUES (2, N'ADMIN')
GO
INSERT [dbo].[RoleMaster] ([RoleId], [RoleName]) VALUES (3, N'USER')
GO
SET IDENTITY_INSERT [dbo].[UserDetails] ON 

GO
INSERT [dbo].[UserDetails] ([UserId], [UserName], [Password], [CreatedAt]) VALUES (1, N'sanjayrane195@gmail.com', N'6lZ6Nf6mQN6F+7M9O5cwBw==', CAST(N'2021-08-09 10:31:59.760' AS DateTime))
GO
INSERT [dbo].[UserDetails] ([UserId], [UserName], [Password], [CreatedAt]) VALUES (2, N'sanjayrane@gmail.com', N'6lZ6Nf6mQN6F+7M9O5cwBw==', CAST(N'2021-08-09 16:40:21.593' AS DateTime))
GO
INSERT [dbo].[UserDetails] ([UserId], [UserName], [Password], [CreatedAt]) VALUES (3, N'sachin@gmail.com', N'mHxqsN5df1UQR7yZUuN4ag==', CAST(N'2021-08-12 11:48:31.927' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[UserDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[UserRoleMappingDetails] ON 

GO
INSERT [dbo].[UserRoleMappingDetails] ([UserRoleMapId], [UserId], [RoleId]) VALUES (1, 1, 1)
GO
INSERT [dbo].[UserRoleMappingDetails] ([UserRoleMapId], [UserId], [RoleId]) VALUES (2, 2, 3)
GO
INSERT [dbo].[UserRoleMappingDetails] ([UserRoleMapId], [UserId], [RoleId]) VALUES (3, 3, 3)
GO
SET IDENTITY_INSERT [dbo].[UserRoleMappingDetails] OFF
GO
