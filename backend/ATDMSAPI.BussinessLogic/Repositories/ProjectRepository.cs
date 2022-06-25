using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class ProjectRepository : IProjectRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public ProjectRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        //public Task<Project> AddProject(Project project)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<ProjectTask> AddProjectTask(ProjectTask projectTask)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<Project> AddProject(Project project)
        {
            //If Data is present in DB avoid duplicate entry.
            if (!CheckProjectDetails(project))
            {
                var result = await _AtdmsWebContext.Projects.AddAsync(project);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            return project;
        }

        //Check whether data is peresent or not.
        public bool CheckProjectDetails(Project detail)
        {
            var check = _AtdmsWebContext.Projects.Where(x => x.ProjectName.ToLower().Equals(detail.ProjectName.ToLower())
                                                            ).ToList();
            return check.Count() != 0;
        }

        public async Task<ProjectTask> AddProjectTask(ProjectTask projectTask)
        {
            //If Data is present in DB avoid duplicate entry.
            //if (!CheckprojectTaskDetails(projectTask))
            //{
                var result = await _AtdmsWebContext.ProjectTasks.AddAsync(projectTask);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            //}
            //return projectTask;
        }
        //Check whether data is peresent or not.
        public bool CheckprojectTaskDetails(ProjectTask projectTask)
        {
            var check = _AtdmsWebContext.ProjectTasks.Where(x => x.ProjectsTaskType.ToLower().Equals(projectTask.ProjectsTaskType.ToLower())
                                                            ).ToList();
            return check.Count() != 0;
        }


        public IEnumerable<Project> GetAllProject()
        {
            return _AtdmsWebContext.Projects.ToList();
        }

        
        public IEnumerable<ProjectDTO> GetProject()
        {
            var data = (from p in _AtdmsWebContext.Projects
                        join pT in _AtdmsWebContext.ProjectTasks on p.ProjectId equals pT.ProjectId
                        select new ProjectDTO()
                        {
                            projects = p,
                            projectTask = pT
                        }).ToList();
            return data;
        }
        public ProjectDTO GetProjectTaskById(int taskId)
        {
            var data = (from pT in _AtdmsWebContext.ProjectTasks.Where(x=>x.ProjectsTaskId.Equals(taskId))
                        join p in _AtdmsWebContext.Projects on pT.ProjectId equals p.ProjectId
                        select new ProjectDTO()
                        {
                            projects = p,
                            projectTask = pT
                        }).FirstOrDefault();
            return data;
        }

        public IEnumerable<ProjectTask> GetProjectTask()
        {
            return _AtdmsWebContext.ProjectTasks.ToList();
        }

        public bool UpdateProject(Project project)
        {
            try
            {
                var entity = _AtdmsWebContext.Projects.Where(x => x.ProjectId.Equals(project.ProjectId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.ProjectId = project.ProjectId;
                    entity.ProjectName = project.ProjectName;
                    entity.ProjectDescription = project.ProjectDescription;
                    
                    _AtdmsWebContext.Projects.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

        public bool DeleteProject(int ProjectId)
        {
            try
            {
                Project project = _AtdmsWebContext.Projects.FirstOrDefault(x => x.ProjectId.Equals(ProjectId));
                _AtdmsWebContext.Projects.Remove(project);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public bool UpdateProjectTask(ProjectTask projectTask)
        {
            try
            {
                var entity = _AtdmsWebContext.ProjectTasks.Where(x => x.ProjectsTaskId.Equals(projectTask.ProjectsTaskId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.ProjectsTaskId = projectTask.ProjectsTaskId;
                    entity.ProjectsTaskType = projectTask.ProjectsTaskType;
                    entity.ProjectId = projectTask.ProjectId;
                    entity.ProjectDescription = projectTask.ProjectDescription;
                    entity.Prorities = projectTask.Prorities;
                    entity.WorkingHours = projectTask.WorkingHours;
                    _AtdmsWebContext.ProjectTasks.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

        public bool DeleteProjectTask(int ProjectTasksId)
        {
            try
            {
                ProjectTask projectTask = _AtdmsWebContext.ProjectTasks.FirstOrDefault(x => x.ProjectsTaskId.Equals(ProjectTasksId));
                _AtdmsWebContext.ProjectTasks.Remove(projectTask);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }


    }
}