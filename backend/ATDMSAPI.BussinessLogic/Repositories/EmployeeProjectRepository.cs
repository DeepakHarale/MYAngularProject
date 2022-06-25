using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class EmployeeProjectRepository:IEmployeeProjectRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public EmployeeProjectRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        public IEnumerable<EmployeeProject> GetEmployeeProject()
        {
            return _AtdmsWebContext.EmployeeProjects.ToList();
        }
        public async Task<IEnumerable<EmployeeProjectDTO>> GetProjectByEmployee(int employeeId)
        {
            var data = await (from empProject in _AtdmsWebContext.EmployeeProjects.Where(x => x.EmployeeId.Equals(employeeId))
                              join empDetail in _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeId.Equals(employeeId)) on empProject.EmployeeId equals empDetail.EmployeeId
                              join PT in _AtdmsWebContext.ProjectTasks on empProject.ProjectTasksId equals PT.ProjectsTaskId
                              join P  in _AtdmsWebContext.Projects on PT.ProjectId equals P.ProjectId
                              select new EmployeeProjectDTO()
                              {
                                  employeeProject = empProject,
                                  employee = empDetail,
                                  projectTask = PT,
                                  project = P
                              }).ToListAsync();
            return data;
        }




        public bool UpdateEmployeeProject(EmployeeProject employeeProject)
        {
            try
            {
                var entity = _AtdmsWebContext.EmployeeProjects.Where(x => x.Id.Equals(employeeProject.Id)).FirstOrDefault();
                if (entity != null)
                {
                    entity.Id = employeeProject.Id;
                    entity.ProjectTasksId = employeeProject.ProjectTasksId;
                    entity.EmployeeId =employeeProject.EmployeeId;

                    _AtdmsWebContext.EmployeeProjects.Update(entity);
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

        public bool DeleteEmployeeProject(int Id)
        {
            try
            {
                EmployeeProject employeeProject = _AtdmsWebContext.EmployeeProjects.FirstOrDefault(x => x.Id.Equals(Id));
                _AtdmsWebContext.EmployeeProjects.Remove(employeeProject);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }
        public EmployeeProject GetEmployeeProjectByTaskId(int TaskId)
        {
          return  _AtdmsWebContext.EmployeeProjects.Where(x =>
           x.ProjectTasksId.Equals(TaskId)).FirstOrDefault();            
        }

        public async Task<EmployeeProject> AddEmployeeProject(EmployeeProject employeeProject)
        {
            if (!ExistingEmpProject(employeeProject)) 
            {
                var result = await _AtdmsWebContext.EmployeeProjects.AddAsync(employeeProject);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            return employeeProject;           
        }

        public bool ExistingEmpProject(EmployeeProject employeeProject)
        {
            var result =  _AtdmsWebContext.EmployeeProjects.Where(x => x.EmployeeId.Equals(employeeProject.EmployeeId) &&
            x.ProjectTasksId.Equals(employeeProject.ProjectTasksId)).ToList(); ;
            return result.Count()>0?true:false;
        }

    }
}
