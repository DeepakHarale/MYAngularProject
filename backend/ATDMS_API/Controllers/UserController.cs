using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Helpers;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]/[action]")]

    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private readonly IUserRepository _userRepository;

        public UserController(IConfiguration config, IUserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }

        [HttpGet("{UserId}")]
        //[Authorize]
        public IActionResult GetUserById(int UserId)
        {
            return  Ok(_userRepository.GetUserById(UserId));
        }


        [HttpGet()]
        public async Task<IEnumerable<RoleMaster>> GetRoles()
        {
            return await _userRepository.GetRoles();
        }



        [HttpGet()]
        public async Task<IEnumerable<UserDetail>> GetDetails()
        {
            return await _userRepository.GetDetails();
        }


        [HttpGet()]
        public async Task<IEnumerable<UserRoleMappingDetail>> GetUserRole()
        {
            return await _userRepository.GetUserRole();
        }

        [HttpPost()]
        public IActionResult LoginAuth([FromBody] LoginDTO login)
        {
            var user = _userRepository.LoginAuth(login.userName, login.password);
            if (user != null && user.UserId > 0)
            {
                var tokenString = BuildToken(user);
                return Ok(new { user, tokenString });
            }
            return Ok(false);
        }

        [HttpPost()]
        public async Task<IActionResult> AddUserDetails([FromBody] AddUserDTO user)
        {
            var res = await _userRepository.AddUserDetails(user);
            if (res == -1)
            {
                return Ok(new { StatusCode=500,Message="Employee no already exists..!" }) ;
            }
            if (res == -2)
            {
                return Ok(new { StatusCode = 500, Message = "User email address already exists..!" });
            }
            return Ok(res);
        }



        [HttpPost()]
        public IActionResult ChangePassword([FromBody] ChangePasswordDTO change)
        {
            var message = _userRepository.ChangePassword(change);
            return Ok(new { message });
        }

        [HttpGet()]
        public IActionResult DectrpPass(string password, bool isEncrypt)
        {
            var message = "";
            if (isEncrypt)
            {
                message = PwdHelper.Encrypt(password);
                return Ok(message);
            }
            message = PwdHelper.Decrypt(password);
            return Ok(message);
        }

        private string BuildToken(UserDTO user)
        {
            var claims = new[] {
        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
        new Claim("UserId", user.UserId.ToString()),
        new Claim(ClaimTypes.Role, user.RoleId.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };
           
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddDays(1),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }


}
