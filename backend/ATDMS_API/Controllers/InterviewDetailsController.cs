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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InterviewDetailsController : ControllerBase
    {
        private readonly IInterviewDetailsRepository _interviewDetailsRepository;
        public InterviewDetailsController(IInterviewDetailsRepository detailsRepository)
        {
            _interviewDetailsRepository = detailsRepository;
        }


        [HttpGet()]
        public IActionResult GetInterviewDetails()
        {
            try
            {
                var Holidays = _interviewDetailsRepository.GetInterviewDetails();
                return Ok(Holidays);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error is Retriving Data from database");
            }
        }

        [HttpPost()]
        public async Task<IActionResult> AddInterviewDetails([FromBody] InterviewDetail body)
        {
            try
            {
                if (body == null)
                {
                    return BadRequest();
                }
                var res = await _interviewDetailsRepository.AddInterviewDetails(body);
                return Ok(res);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error is Retriving Data from database");
            }
        }


        [HttpPost()]
        public IActionResult UpdateInterviewDetail([FromBody] InterviewDetail body)
        {
            try
            {
                if (body.CandidateName != null && body.Designation != null && body.Status != null)
                {
                    var res = _interviewDetailsRepository.UpdateInterviewDetail(body);
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
        public bool DeleteHolidayDetails([FromBody] InterviewDetail HDelete)
        {
            var res = _interviewDetailsRepository.DeletenterviewDetail(HDelete);
            return res;
        }


    }


}
