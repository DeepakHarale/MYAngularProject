using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayRepository _holidayRepository;
        public HolidayController(IHolidayRepository holidayRepository)
        {
            _holidayRepository = holidayRepository;
        }
        [HttpGet()]
        public IActionResult GetHoliday()
        {
        try {
                var Holidays = _holidayRepository.GetHolidays();
                return Ok(Holidays);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    "Error is Retriving Data from database");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> AddHolidayDeatils([FromBody] HolidayDetail body)
        {
            try {
                if (body == null)
                {
                    return BadRequest();
                }
                   var res = await _holidayRepository.AddHolidayDeatils(body);         
                    return Ok(res);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error is Retriving Data from database");
            }
        }


        [HttpPost()]
        public IActionResult UpdateHolidayDeatils([FromBody] HolidayDetail body)
        {
            try
            {
                if (body.HolidayType != null && body.AddedBy!=null && body.AddedOn!=null)
                {
                    var res = _holidayRepository.UpdateHolidayDeatils(body);
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

        [HttpPost()]
        public bool DeleteHolidayDetails([FromBody] HolidayDetail HDelete)
        {
            var res = _holidayRepository.DeleteHolidayDetails(HDelete);
            return res;
        }
       }
    }
