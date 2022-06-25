using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class UserRoleMappingDetail
    {
        public int UserRoleMapId { get; set; }
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
    }
}
