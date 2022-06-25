using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IProjectRepository
    {
        IEnumerable<Project> GetAllProject();


        IEnumerable<ProjectTask> GetProjectTask();

        IEnumerable<ProjectDTO> GetProject();

        Task<Project> AddProject(Project project);

        Task<ProjectTask> AddProjectTask(ProjectTask projectTask);

        //Task<ProjectTask> AddProjectTask(ProjectTask projectTask);

        bool UpdateProject(Project project);
        
        bool DeleteProject(int ProjectId);

        bool UpdateProjectTask(ProjectTask projectTask);
        
        bool DeleteProjectTask(int projectTasksId);

        ProjectDTO GetProjectTaskById(int taskId);

    }
}
