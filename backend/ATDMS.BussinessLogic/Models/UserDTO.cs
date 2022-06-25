using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMS.BussinessLogic.Models
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
        public int EmployeeId { get; set; }
        public string EmpoyeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string ProfilePhotoPath { get; set; }
    }
}
