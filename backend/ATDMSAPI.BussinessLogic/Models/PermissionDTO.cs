using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ATDMSAPI.BussinessLogic.EfModeles;

namespace ATDMSAPI.BussinessLogic.Models
{
    public class PermissionDTO
    {
        public RoleMaster Role { get; set; }

        public Module module { get; set; }

        public PermissionMaster permission { get; set; }

        public RolePermission rolepermissions { get; set; }
    }

    public class ModulePermissionDTO
    {
        public int ModuleId { get; set; }
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public bool ApprvedStatus { get; set; }
    }
    public class PermissionDetailsDTO
    {
        public Module module { get; set; }
        public List<ModulePermissionDTO> PermissionList { get; set; }
    }
    public class ModuleAllPermissionDTO
    {
        public Module module { get; set; }
        public List<ModulePermissionDTO> PermissionList { get; set; }
    }
}
