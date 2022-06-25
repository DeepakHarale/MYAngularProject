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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet("Project")]
        public IEnumerable<Project> GetAllProject()
        {
            return _projectRepository.GetAllProject();
        }

        [HttpGet("ProjectTask")]
        public IEnumerable<ProjectTask> GetProjectTask()
        {
            return _projectRepository.GetProjectTask();
        }

        [HttpGet("AllProjectDetails")]
        public IEnumerable<ProjectDTO> GetProject() 
        {
            return _projectRepository.GetProject();
        }
        [HttpGet("GetProjectTaskById/{taskId}")]
        public IActionResult GetProjectTaskById(int taskId)
        {
            var res = _projectRepository.GetProjectTaskById(taskId);
            if (res !=null)
            {
                return Ok(res);
            }
            return Ok(false);
        }

        [HttpPost("AddProject")]
        public async Task<IActionResult> AddProject([FromBody] Project project)
        {
            var res = await _projectRepository.AddProject(project);
            return Ok(res);
        }

        [HttpPost("ProjectTask")]
        public async Task<IActionResult> AddProjectTask([FromBody] ProjectTask projectTask)
        {
            var res = await _projectRepository.AddProjectTask(projectTask);
            return Ok(res);
        }

        [HttpPut("UpdateProject")]
        public bool UpdateProject([FromBody]  Project project)
        {
            return _projectRepository.UpdateProject(project);
        }

        [HttpPost("DeleteProject")]
        public bool DeleteProject(int ProjectId)
        {
            var res = _projectRepository.DeleteProject(ProjectId);

            return res;
        }

        [HttpPut("UpdateProjectTask")]
        public bool UpdateProjectTask([FromBody]  ProjectTask projectTask)
        {
            return _projectRepository.UpdateProjectTask(projectTask);
        }

        [HttpPost("DeleteProjectTask")]
        public bool DeleteProjectTask(int ProjectTasksId)
        {
            var res = _projectRepository.DeleteProjectTask(ProjectTasksId);

            return res;
        }
    }
}
