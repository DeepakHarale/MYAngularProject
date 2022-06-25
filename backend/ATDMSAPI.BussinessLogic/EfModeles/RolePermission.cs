using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class RolePermission
    {
        public int RolePermissionId { get; set; }
        public int RoleId { get; set; }
        public int ModuleId { get; set; }
        public int PermissionId { get; set; }
        public bool ApprvedStatus { get; set; }
        public bool? IsActive { get; set; }
    }
}
