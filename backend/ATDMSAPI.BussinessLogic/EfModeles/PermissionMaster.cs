using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class PermissionMaster
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public bool IsActive { get; set; }
    }
}
