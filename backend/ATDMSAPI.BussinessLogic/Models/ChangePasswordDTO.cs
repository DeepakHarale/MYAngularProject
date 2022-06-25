using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMSAPI.BussinessLogic.Models
{
 public  class ChangePasswordDTO
    {
        public string UserName { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class ResetPasswordDTO
    {
        public int UserId { get; set; }
        public string NewPassword { get; set; }
    }
}
