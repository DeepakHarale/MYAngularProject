using ATDMSAPI.BussinessLogic.Models;
using ATDMS_API.Models;
using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveRepository _leaveRepository;



        public LeaveController(ILeaveRepository leaveRepository)
        {
            _leaveRepository = leaveRepository;
        }

        // role wise api call
        //[Authorize(Roles = "3")]
        [HttpGet("LeaveType")]
        public IEnumerable<LeaveType> GetLeaveType()
        {
            return _leaveRepository.GetLeaveType();
        }

        [HttpGet("GetAllLeave")]
        public IEnumerable<AllLeaveDTO> GetAllLeave()
        {
            return _leaveRepository.GetAllLeave();
        }

        [HttpGet("GetLeaveById/{employeeId}")]
        public IEnumerable<LeaveDTO> GetLeaveById(int employeeId)
        {
            return _leaveRepository.GetLeaveById(employeeId);
        }

        [HttpGet("UpdateLeaveStatus")]
        public IActionResult UpdateLeaveStatus(int LeaveId, string status)
        {
            return Ok(_leaveRepository.UpdateLeaveStatus(LeaveId, status));
        }

        [HttpPost("LeaveDetail")]
        public async Task<IActionResult> AddLeaveDetail(LeaveDetail leaveDetail)
        {
            var res = await _leaveRepository.AddLeaveDetail(leaveDetail);
            return Ok(res);
        }

        [HttpPost("UpdateLeaveDetail")]
        public bool UpdateLeaveDetail( LeaveDetail leaveDetail)
        {
            return _leaveRepository.UpdateLeaveDetail(leaveDetail);
        }

        [HttpPost("DeleteLeaveDetail")]
        public bool DeleteLeaveDetail(int LeaveId)
        {
            var res = _leaveRepository.DeleteLeaveDetail(LeaveId);
            
            return res;
        }

    }
}
