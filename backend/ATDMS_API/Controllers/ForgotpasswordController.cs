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
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotpasswordController : ControllerBase
    {
        private readonly IForgotpasswordRepository _forgotpasswordRepository;
        public ForgotpasswordController(IForgotpasswordRepository forgotpasswordRepository)
        {
            _forgotpasswordRepository = forgotpasswordRepository;
        }
        [HttpGet("ForgotPassword")]
        public  Task <bool> GetForgotPassword(string UserName)
        {
            return _forgotpasswordRepository.GetForgotPassword(UserName);
        }

        [HttpGet("VerifyCode")]
        public IActionResult  GetVerifyCode(string Code)
        {
            var UserId =  _forgotpasswordRepository.GetVerifyCode(Code);
            return Ok(new { UserId });
        }

        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword(ResetPasswordDTO reset)
        {
            var message= _forgotpasswordRepository.ResetPassword(reset);
            return Ok(new { message });
        }

    }
}
