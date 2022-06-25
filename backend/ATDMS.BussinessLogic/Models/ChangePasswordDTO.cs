using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMS.BussinessLogic.Models
{
 public  class ChangePasswordDTO
    {
        public string UserName { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
