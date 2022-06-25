using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMSAPI.BussinessLogic.Models
{
   public class AddUserDTO
    {
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public int? RoleId { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string Division { get; set; }
        public string Department { get; set; }
        public string EmployeeStatus { get; set; }

        public string EmergencyNo { get; set; }

    }
}
