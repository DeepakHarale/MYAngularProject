using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
    class EmployeeLeaveDetailsDTO
    {
        public EmployeeDetail employee { get; set; }
        public List<LeaveDTO> leaveList { get; set; }
    }
}
