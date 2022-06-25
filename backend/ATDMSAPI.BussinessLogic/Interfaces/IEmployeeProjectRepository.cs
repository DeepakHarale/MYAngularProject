using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IEmployeeProjectRepository
    {
        


        IEnumerable<EmployeeProject> GetEmployeeProject();


        EmployeeProject GetEmployeeProjectByTaskId(int TaskId);
        Task<EmployeeProject> AddEmployeeProject(EmployeeProject employeeProject);

        bool UpdateEmployeeProject(EmployeeProject employeeProject);

        bool DeleteEmployeeProject(int Id);

         Task<IEnumerable<EmployeeProjectDTO>> GetProjectByEmployee(int employeeId);




    }
}
