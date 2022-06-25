using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeSkillSetController : ControllerBase
    {
        private readonly IEmployeeSkillSetRepository _employeeSkillSetRepository;
        public EmployeeSkillSetController(IEmployeeSkillSetRepository employeeSkillSetRepository)
        {
            _employeeSkillSetRepository = employeeSkillSetRepository;
        }

        [HttpGet("GetEmployeeSkillSet")]
        public IEnumerable<EmployeeSkillSet> GetEmployeeSkillSet()
        {
            return _employeeSkillSetRepository.GetEmployeeSkillSet();
        }

        [HttpPost("AddEmployeeSkillSet")]
        public async Task<IActionResult> AddEmployeeSkillSet([FromBody] EmployeeSkillSet employeeSkillSet)
        {
            var res = await _employeeSkillSetRepository.AddEmployeeSkillSet(employeeSkillSet);
            return Ok(res);
        }


        [HttpPut("UpdateEmployeeSkillSet")]
        public bool UpdateEmployeeSkillSet([FromBody] EmployeeSkillSet employeeSkillSet)
        {
            return _employeeSkillSetRepository.UpdateEmployeeSkillSet(employeeSkillSet);
        }

        [HttpDelete("DeleteEmployeeSkillSet")]
        public bool DeleteEmployeeSkillSet(int SkillId)
        {
            var res = _employeeSkillSetRepository.DeleteEmployeeSkillSet(SkillId);

            return res;
        }
    }
}
