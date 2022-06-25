using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IModuleRepository
    {
        IEnumerable<Module> GetAllBaseModules();
        IEnumerable<Module> GetModule(int moduleId);

        IEnumerable<Module> GetSubModules(int moduleId);       

        Task<Module> AddModule(Module module);        

        bool UpdateModule(Module module);

        bool DeleteModule(int moduleId);

       
    }
}
