using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMSAPI.BussinessLogic.Helpers
{


    public static class ServiceRepositoryCollectionExtension
    {
        public static IServiceCollection AddServiceRepositories(this IServiceCollection services)
        {

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ILeaveRepository, LeaveRepository>();
            services.AddScoped<IHolidayRepository, HolidayRepository>();
            services.AddScoped<ITimeSheetRepository, weeklyTimeSheetRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IEmployeeProjectRepository, EmployeeProjectRepository>();
            services.AddScoped<IAssignProjectRepository, AssignProjectRepository>();
            services.AddScoped<IModuleRepository, ModuleRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IPermissions, PermissionRepository>();
            services.AddScoped<ILeaveManagementRepository, LeaveManagementRepository>();
            services.AddScoped<IHighlightsRepository, HighlightRepository>();
            services.AddScoped<IEmployeeProfilePhoto, EmployeeProfilePhoto>();
            services.AddScoped<IEmployeeSkillSetRepository, EmployeeSkillSetRepository>();
            services.AddScoped<IEmpInfoRepository, EmpInfoRepository>();
            services.AddScoped<IToDoListRepository, ToDoListRepository>();
            services.AddScoped<IInterviewDetailsRepository, InterviewDetailsRepository>();
            services.AddScoped<IAccessoriesStorageRepository, AccessoriesStorageRepository>();
            services.AddScoped<IOfficialDocumentRepository, OfficialDocumentRepository>();
            services.AddScoped<IForgotpasswordRepository, ForgotPasswordRepository>();



            return services;
        }



    }
}
