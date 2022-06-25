using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
    public class LeaveDTO
    {
        public LeaveDetail leave { get; set; }
        public LeaveType leaveType { get; set; }
    }

    public class AllLeaveDTO
    {
        public LeaveDetail leave { get; set; }
        public LeaveType leaveType { get; set; }
        public EmployeeDetail employee { get; set; }
    }
    public class EmplyeeLeaveDTO
    {
        public int leaveId { get; set; }
        public Double leaveCount { get; set; }
    }
    public class EmployeeDetailsDTO
    {
        public int employeeId { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? JoiningDate { get; set; }
    }
}
