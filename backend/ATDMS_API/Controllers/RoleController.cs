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
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }



        [HttpGet("GetRoles")]
        public IEnumerable<RoleMaster> GetRoles()
        {
            return _roleRepository.GetRoles();
        }

       
        [HttpGet("GetRole/{roleId}")]
        
        public IEnumerable<RoleMaster> GetRole(int roleId)
        {

            return _roleRepository.GetRole(roleId);
        }
      

        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole([FromBody] RoleMaster role)
        {
            var res = await _roleRepository.AddRole(role);
            return Ok(res);
        }


        [HttpPut("UpdateRole")]
        public bool UpdateRole([FromBody] RoleMaster role)
        {
            return _roleRepository.UpdateRole(role);
        }


        [HttpPost("DeleteRole")]
        public bool DeleteRole([FromBody] RoleMaster role)
        {
            return _roleRepository.DeleteRole(role.RoleId);
        }
    }
}
