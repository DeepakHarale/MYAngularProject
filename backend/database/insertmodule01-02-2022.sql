/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 [ModuleId]
      ,[ParentModuleId]
      ,[ModuleName]
      ,[ModuleDesc]
      ,[AddedOn]
      ,[AddedBy]
      ,[IsActive]
      ,[orderById]
  FROM [db_a7ad44_hradmin].[dbo].[Modules]

  insert into Modules values(0,'Documents','Compnies documents',null,null,1,3)

  insert into Modules values(29,'Company Policies','All company documents',null,null,1,3)

  insert into Modules values(2,'Genrate Documnets','Genrate Employee documnets',null,null,1,3)

  insert into Modules values(0,'Report','Total report',null,null,1,3)

  insert into modules values(35,'Employee_Report','Total report',null,null,1,3)

  insert into modules values(35,'Timesheet_Report','Total report',null,null,1,3)

  select * from modules

  

  update modules set ParentModuleId = 0 where ModuleId=35

  update modules set ParentModuleId = 35 where ModuleId=36

  update modules set ParentModuleId=35 where ModuleId=37

  use db_a7ad44_hradmin

  insert into Modules values(2,'Offer_letter','EmployeeModule',null,null,1,3)

  insert into Modules values(2,'Appointment_letter','EmployeeModule',null,null,1,3)

  insert into Modules values(2,'Reliving_letter','EmployeeModule',null,null,1,3)

  insert into Modules values(2,'Experince_letter','EmployeeModule',null,null,1,3)

  select * from Modules