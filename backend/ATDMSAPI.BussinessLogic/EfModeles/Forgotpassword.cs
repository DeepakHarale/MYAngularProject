using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class Forgotpassword
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Code { get; set; }
        public DateTime? ExpiryTime { get; set; }
    }
}
