using ATDMS.BussinessLogic.Interfaces;
using ATDMS.BussinessLogic.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMS.BussinessLogic.Helpers
{
  
 
        public static class ServiceRepositoryCollectionExtension
        {
            public static IServiceCollection AddServiceRepositories(this IServiceCollection services)
            {
                
                services.AddScoped<IUserRepository, UserRepository>();
                services.AddScoped<IEmployeeRepository, EmployeeRepository>();


            return services;
            }



    }
}
