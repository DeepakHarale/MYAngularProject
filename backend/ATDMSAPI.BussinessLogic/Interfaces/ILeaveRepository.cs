using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface ILeaveRepository
    {
        IEnumerable<AllLeaveDTO> GetAllLeave();


        IEnumerable<LeaveType> GetLeaveType();

        IEnumerable<LeaveDTO> GetLeaveById(int employeeId);
      

        Task<LeaveDetail> AddLeaveDetail(LeaveDetail leaveDetail);

    

        bool UpdateLeaveDetail(LeaveDetail leaveDetail);

        bool DeleteLeaveDetail(int LeaveId);
        bool UpdateLeaveStatus(int LeaveId, string status);
    }
}
