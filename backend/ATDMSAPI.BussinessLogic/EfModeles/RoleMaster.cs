using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class RoleMaster
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public DateTime? AddedOn { get; set; }
        public int? AddedBy { get; set; }
        public bool? IsActive { get; set; }
    }
}
