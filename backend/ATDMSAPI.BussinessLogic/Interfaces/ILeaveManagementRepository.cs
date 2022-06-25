using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface ILeaveManagementRepository
    {
        IEnumerable<EmplyeeLeaveDTO> GetLeavesTakenByEmployee(int employeeId);
        IEnumerable<LeaveType> GetLeavesAssignedToEmployee(int employeeId);

        IEnumerable<EmplyeeLeaveDTO> LeaveCalculation(IEnumerable<EmplyeeLeaveDTO> TakenLeaves, IEnumerable<LeaveType> AssignedLeaves);

        IEnumerable<EmplyeeLeaveDTO> GetAvailableLeavesOfEmployee(int employeeId);
    }
}
