using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissions _permissionRepository;

        public PermissionController(IPermissions permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }
        // GET: api/<PermossionController>

        [HttpGet("GetRolePermisions/{roleId}")]
        public Task<IEnumerable<PermissionDTO>> GetRolePermissions(int roleId)
        {
            return _permissionRepository.GetRolePermission(roleId);
        }


        [HttpGet("GetModulePermisions/{moduleId}")]
        public Task<IEnumerable<PermissionDTO>> GetModulePermissions(int moduleId)
        {
            return _permissionRepository.GetModulePermissions(moduleId);
        }

        [HttpGet("GetSubModulePermisions/{parentModuleId}")]
        public Task<IEnumerable<PermissionDTO>> GetSubModulePermissions(int parentModuleId)
        {
            return _permissionRepository.GetSubModulePermissions(parentModuleId);
        }

        [HttpGet("GetPermision/{permissionId}")]
        public Task<IEnumerable<PermissionDTO>> GetPermissionById(int permissionId)
        {
            return _permissionRepository.GetPermissionById(permissionId);
        }


        [HttpGet("GetAllModulePermision/{roleId}")]
        public IEnumerable<ModuleAllPermissionDTO> GetAllModulePermision(int roleId)
        {
            return _permissionRepository.GetAllModulePermissions(roleId);
        }


        // POST api/<PermossionController>
        [HttpPost("AddModulePermissions/{roleId}")]
        public List<RolePermission> AddPermission([FromBody] IEnumerable<ModuleAllPermissionDTO> moperDtToAdd, int roleId)
        {
            var per =  _permissionRepository.AddModulePermissions(moperDtToAdd, roleId);
            return per;
        }

        // PUT api/<PermossionController>/5
        [HttpPut("UpdatePermission")]
        public bool UpdatePermission([FromBody] RolePermission permission)
        {
            return _permissionRepository.UpdatePermission(permission);
        }

        // DELETE api/<PermossionController>/5
        [HttpDelete("DeletePermission")]
        public bool DeletePermission([FromBody] RolePermission permission)
        {
            return _permissionRepository.DeletePermission(permission.RolePermissionId);
        }
    }
}
