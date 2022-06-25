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
   
   public class ModuleRepository : IModuleRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;
        public ModuleRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public async Task<Module> AddModule(Module module)
        {
            //If Data is present in DB avoid duplicate entry.
            if (!CheckModuleDetails(module))
            {
                var result = await _AtdmsWebContext.Modules.AddAsync(module);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            return module;
        }

        //Check whether data is peresent or not.
        public bool CheckModuleDetails(Module module)
        {
            var check = _AtdmsWebContext.Modules.Where(x => x.ModuleName.ToLower().Equals(module.ModuleName.ToLower())
                                                            ).ToList();
            return check.Count() != 0;
        }            

        public bool DeleteModule(int moduleId)
        {
           // 
             IEnumerable < Module > submodules = _AtdmsWebContext.Modules.Where(x => x.ParentModuleId.Equals(moduleId)).ToList();
            if (submodules != null)
            {
                _AtdmsWebContext.Modules.RemoveRange(submodules); 
                _AtdmsWebContext.SaveChanges();
            }
            Module module = _AtdmsWebContext.Modules.FirstOrDefault(x => x.ModuleId.Equals(moduleId));
            _AtdmsWebContext.Modules.RemoveRange(module);

            _AtdmsWebContext.SaveChanges();
            return true;
        }

        public IEnumerable<Module> GetAllBaseModules()
        {           
            var data = (_AtdmsWebContext.Modules.Where(x => x.IsActive.Equals(true))).ToList();
            
            return data;
        }

        public IEnumerable<Module> GetSubModules(int moduleId)
        {
            var data = _AtdmsWebContext.Modules.Where(x => x.ParentModuleId.Equals(moduleId) && x.IsActive.Equals(true)).ToList();
            return data;
        }

        public IEnumerable<Module> GetModule(int moduleId)
        {
            var data = _AtdmsWebContext.Modules.Where(x => x.ModuleId.Equals(moduleId) && x.IsActive.Equals(true)).ToList();
            return data;
        }

        public IEnumerable<Module> GetAllModule()
        {
            var data = _AtdmsWebContext.Modules.Where(x => x.IsActive.Equals(true) && x.ParentModuleId !=0).ToList();
            return data;
        }
        public bool UpdateModule(Module module)
        {
            var entity = _AtdmsWebContext.Modules.Where(x => x.ModuleId.Equals(module.ModuleId)).FirstOrDefault();
            if (entity != null)
            {
                entity.ModuleId = module.ModuleId;
               entity.ModuleName= module.ModuleName;
                entity.ModuleDesc = module.ModuleDesc;
                entity.IsActive=module.IsActive;
                entity.ParentModuleId=module.ParentModuleId;
                _AtdmsWebContext.Modules.Update(entity);
                _AtdmsWebContext.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
