using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        private readonly IModuleRepository _moduleRepository;
        public ModuleController(IModuleRepository moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }

       
        [HttpGet("GetBaseModules")]
        public IEnumerable<Module> GetAllBaseModules()
        {
            return _moduleRepository.GetAllBaseModules();
        }        
        
        [HttpGet("GetModule/{moduleId}")]
        public IEnumerable<Module> GetModule(int moduleId)
        {

            return _moduleRepository.GetModule(moduleId);
        }

        [HttpGet("GetSubModules/{moduleId}")]
        public IEnumerable<Module> GetsubModule(int moduleId)
        {
            return _moduleRepository.GetSubModules(moduleId);
        }
        
        [HttpPost("AddModule")]
        public async Task<IActionResult> AddModule([FromBody] Module module)
        {
            var res = await _moduleRepository.AddModule(module);
            return Ok(res);
        }

        
        [HttpPut("UpdateModule")]
        public bool UpdateModule([FromBody] Module module)
        {
            return _moduleRepository.UpdateModule(module);
        }

       
        [HttpDelete("DeleteModule")]
        public bool DeleteModule(Module module)
        {
            return _moduleRepository.UpdateModule(module);
        }
    }
}
