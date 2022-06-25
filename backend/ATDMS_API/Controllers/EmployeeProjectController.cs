using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
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
    public class EmployeeProjectController : ControllerBase
    {
        private readonly IEmployeeProjectRepository _employeeProjectRepository;
        public EmployeeProjectController(IEmployeeProjectRepository employeeProjectRepository)
        {
            _employeeProjectRepository = employeeProjectRepository;
        }

        [HttpGet("GetEmployeeProject")]
        public IEnumerable<EmployeeProject> GetEmployeeProject()
        {
            return _employeeProjectRepository.GetEmployeeProject();
        }

        [HttpGet("GetEmployeeProjectByTaskId/{TaskId}")]
        public IActionResult GetEmployeeProjectByTaskId(int TaskId)
        {
            var res = _employeeProjectRepository.GetEmployeeProjectByTaskId(TaskId);
            return Ok(res);
        }
        [HttpGet("GetProjectByEmployee/{employeeId}")]
        public async Task<IEnumerable<EmployeeProjectDTO>> GetProjectByEmployee(int employeeId)
        {
            return await _employeeProjectRepository.GetProjectByEmployee(employeeId);
        }


        [HttpPost("AddEmployeeProject")]
        public async Task<IActionResult> AddEmployeeProject([FromBody] EmployeeProject employeeProject)
        {
            var res = await _employeeProjectRepository.AddEmployeeProject(employeeProject);
            return Ok(res);
        }


        [HttpPut("UpdateEmployeeProject")]
        public bool UpdateEmployeeProject([FromBody] EmployeeProject employeeProject)
        {
            return _employeeProjectRepository.UpdateEmployeeProject(employeeProject);
        }

        [HttpPost("DeleteEmployeeProject")]
        public bool DeleteEmployeeProject(int Id)
        {
            var res = _employeeProjectRepository.DeleteEmployeeProject(Id);

            return res;
        }
    }
}
