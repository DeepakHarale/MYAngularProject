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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AssignProjectController : ControllerBase
    {
        private readonly IAssignProjectRepository _assignProject;


        public AssignProjectController(IAssignProjectRepository assignProject)
        {
            _assignProject = assignProject;
        }

        [HttpGet()]
        public IActionResult HealthCheck()
        {
            return Ok(true);
        }
        [HttpPost()]
        public async Task<IActionResult> AddBulkAssignProject([FromBody]List<AssignProject> assigns)
        {
            var res = await _assignProject.AddBulkAssignProject(assigns);
            return Ok(res);
        }
        [HttpGet("{projectId}")]
        public  IActionResult GetAllEmployeeByProject(int? projectId)
        {
            var res =  _assignProject.GetAllEmployeeByProject(projectId);
            return Ok(res);
        }

    }
}
