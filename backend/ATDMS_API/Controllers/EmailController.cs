using ATDMSAPI.BussinessLogic.Models;
using ATDMSAPI.BussinessLogic.Services;


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
    public class EmailController : ControllerBase
    {
        private readonly IMailService _mailService;

        

        public EmailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        
        [HttpPost("Send")]
        public async Task<IActionResult> Send([FromForm] MailRequest request)
        {
            try
            {
                await _mailService.SendEMailAsync(request);
                return Ok();
            }
            catch(Exception ex)
            {
                throw ex;

            }
        } 
    }
}
