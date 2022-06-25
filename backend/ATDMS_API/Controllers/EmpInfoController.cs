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
    [Route("api/[controller]")]
    [ApiController]
    public class EmpInfoController : ControllerBase
    {
        private readonly IEmpInfoRepository _empInfoRepository;
        public EmpInfoController(IEmpInfoRepository empInfoRepository)
        {
            _empInfoRepository = empInfoRepository;
        }

        [HttpGet("GetEmpInfo")]
        public IEnumerable<EmpInfo> GetEmpInfo()
        {
            return _empInfoRepository.GetEmpInfo();
        }

        [HttpPost("AddEmpInfo")]
        public async Task<IActionResult> AddEmpInfo([FromBody] EmpInfo empInfo)
        {
            var res = await _empInfoRepository.AddEmpInfo(empInfo);
            return Ok(res);
        }


        [HttpPut("UpdateEmpInfo")]
        public bool UpdateEmpInfo([FromBody] EmpInfo empInfo)
        {
            return _empInfoRepository.UpdateEmpInfo(empInfo);
        }

        [HttpDelete("DeleteEmpInfo")]
        public bool DeleteEmpInfo(int EmpInfoId)
        {
            var res = _empInfoRepository.DeleteEmpInfo(EmpInfoId);

            return res;
        }
    }
}

