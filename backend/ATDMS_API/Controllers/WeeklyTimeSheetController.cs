using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class WeeklyTimeSheetController : ControllerBase
    {
        private readonly ITimeSheetRepository _timeSheetRepository;

        public WeeklyTimeSheetController(ITimeSheetRepository timeSheetRepository)
        {
            _timeSheetRepository = timeSheetRepository;
        }

        [HttpGet("{WeekNo}")]
        public IActionResult GetTimeSheet(int WeekNo)
        {
            try
            {
                return Ok(_timeSheetRepository.GetTimesheets(WeekNo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost()]
        public IActionResult TimeSheetStatusUpdate([FromBody] WeeklyTimeSheetUpdate weeklyTimeSheet)
        {
            try
            {
                return Ok(_timeSheetRepository.TimeSheetStatusUpdate(weeklyTimeSheet));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{WeekId}")]
        public ActionResult GetWeekId(int WeekId)
        {
            var res = _timeSheetRepository.GetWeekId(WeekId);

            return Ok(res);
        }

        [HttpGet("{EmployeeId}")]
        public ActionResult GetEmployeeID(int EmployeeId)
        {
            var res = _timeSheetRepository.GetEmployeeID(EmployeeId);
            return Ok(res);
        }

        [HttpGet()]
        public ActionResult GetWeekTimeSheetByWeekId(int weekno, int emploeeId)
        {
          var res= _timeSheetRepository.GetWeekTimeSheetByWeekId(weekno, emploeeId);

            return Ok(res);
        }


        [HttpPost()]
        public async Task<ActionResult<WeeklyTimeSheet>> AddTimesheets([FromBody] WeeklyTimeSheet Wtimesheet)
        {
            try
            {
                if (Wtimesheet == null)
                {
                    return BadRequest();
                }
                var result = await _timeSheetRepository.AddTimesheets(Wtimesheet);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> AddTimesheetBulk([FromBody] List<WeeklyTimeSheet> Wtimesheet)
        {
            try
            {
                if (Wtimesheet == null)
                {
                    return BadRequest();
                }
                var result = await _timeSheetRepository.AddTimesheetBulk(Wtimesheet);
                return Ok(result);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retriving data from dabase");
            }
        }

        [HttpPost()]
        public IActionResult UpdateTimesheet([FromBody] WeeklyTimeSheet Wtimesheet)
        {
            try
            {
                if (Wtimesheet != null)
                {
                    var res = _timeSheetRepository.UpdateTimesheet(Wtimesheet);
                    return Ok(res);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error is Retriving Data from database");
            }
        }

        [HttpGet("{TimeSheetId}")]
        public bool DeleteTimesheet(int TimeSheetId)
        {
            var res = _timeSheetRepository.DeleteTimesheet(TimeSheetId);
            return res;
        }
    }
}
