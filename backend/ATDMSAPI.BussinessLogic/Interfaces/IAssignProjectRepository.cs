using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
  public  interface IAssignProjectRepository
    {
        Task<int> AddBulkAssignProject(List<AssignProject> assigns);
        IEnumerable<AssignProject> GetAllEmployeeByProject(int? projectId);
    }
}
