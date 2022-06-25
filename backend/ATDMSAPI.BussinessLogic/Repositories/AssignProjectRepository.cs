using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using ATDMSAPI.BussinessLogic.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class AssignProjectRepository: IAssignProjectRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public AssignProjectRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }


        public async Task<int> AddBulkAssignProject(List<AssignProject> assigns)
        {
            try
            {
                var ProjectIds = String.Join(",", assigns.Select(p => p.ProjectId));
                var existsU = _AtdmsWebContext.AssignProjects.Where(x => ProjectIds.Contains(x.ProjectId.ToString())).AsEnumerable().ToList();
                if (existsU.Count() > 0)
                {
                    _AtdmsWebContext.AssignProjects.RemoveRange(existsU);
                    _AtdmsWebContext.SaveChanges();
                }
                int i = 0;
                foreach (var obj in assigns)
                {
                    if (!ExistsingAssignProject(obj.ProjectId, obj.EmployeeId))
                    {
                        var id = _AtdmsWebContext.AssignProjects.Max(x => (int?)x.AssignProjectId);
                        obj.AssignProjectId = id.GetValueOrDefault(0) + 1;
                        obj.AddedOn = DateTime.Now;
                        obj.AssignProjectId = id.GetValueOrDefault(0) + 1;
                        await _AtdmsWebContext.AssignProjects.AddAsync(obj);
                        await _AtdmsWebContext.SaveChangesAsync();
                        i++;
                    }
                }
                return i;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private bool ExistsingAssignProject(int? projectId, int? employeId)
        {
            var data = _AtdmsWebContext.AssignProjects.Where(x => x.ProjectId.Equals(projectId) && x.EmployeeId.Equals(employeId)).ToList();
            return data.Count() > 0 ? true : false;
        }

        public IEnumerable<AssignProject> GetAllEmployeeByProject(int? projectId)
        {
          return _AtdmsWebContext.AssignProjects.Where(x => x.ProjectId.Equals(projectId)).AsEnumerable().ToList();
        }

    }
}
