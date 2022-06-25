using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IPermissions
    {
        Task<IEnumerable<PermissionDTO>> GetRolePermission(int roleId);

        Task<IEnumerable<PermissionDTO>> GetRoleModules(int roleId);

        Task<IEnumerable<PermissionDTO>> GetModulePermissions(int moduleId);

        Task<IEnumerable<PermissionDTO>> GetSubModulePermissions(int parentModuleId);

        Task<IEnumerable<PermissionDTO>> GetPermissionById(int permissionId);

        List<RolePermission> AddModulePermissions(IEnumerable<ModuleAllPermissionDTO> moperDtToAdd, int roleId);


        bool UpdatePermission(RolePermission permission);

        bool DeletePermission(int permissionId);

        public IEnumerable<ModuleAllPermissionDTO> GetAllModulePermissions(int roleId);
    }
}
