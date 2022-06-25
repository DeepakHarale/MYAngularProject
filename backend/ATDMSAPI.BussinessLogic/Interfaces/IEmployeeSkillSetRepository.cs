using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IEmployeeSkillSetRepository
    {
        IEnumerable<EmployeeSkillSet> GetEmployeeSkillSet();

        Task<EmployeeSkillSet> AddEmployeeSkillSet(EmployeeSkillSet employeeSkillSet);

        bool UpdateEmployeeSkillSet(EmployeeSkillSet employeeSkillSet);

        bool DeleteEmployeeSkillSet(int SkillId);

    }
}
