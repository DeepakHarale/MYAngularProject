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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveManagementController : ControllerBase
    {
        private readonly ILeaveManagementRepository _leaveRepository;

        public LeaveManagementController (ILeaveManagementRepository leaveRepository)
        {
            _leaveRepository = leaveRepository;
        }

        
        [HttpGet("AvailableLeaves/{employeeId}")]
        public IEnumerable<EmplyeeLeaveDTO> GetAvailableLeavesOfEmployee(int employeeId)
        {
            return _leaveRepository.GetAvailableLeavesOfEmployee(employeeId);
        }

        [HttpGet("LeavesTaken/{employeeId}")]
        public IEnumerable<EmplyeeLeaveDTO> GetLeavesTakenByEmployee(int employeeId)
        {
            return _leaveRepository.GetLeavesTakenByEmployee(employeeId);
        }

        [HttpGet("LeavesAssigned/{employeeId}")]
        public IEnumerable<LeaveType> GetLeavesAssignedToEmployee(int employeeId)
        {
            return _leaveRepository.GetLeavesAssignedToEmployee(employeeId);
        }

       
    }
}
