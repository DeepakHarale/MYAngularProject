using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMS.BussinessLogic.Models
{
   public class AddUserDTO
    {
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public int? RoleId { get; set; }
    }
}
