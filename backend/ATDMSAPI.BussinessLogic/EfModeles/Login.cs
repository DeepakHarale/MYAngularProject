using System;
using System.Collections.Generic;

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class Login
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
    }
}
