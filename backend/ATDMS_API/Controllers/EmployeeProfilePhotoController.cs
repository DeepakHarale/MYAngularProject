using ATDMS_API.Models;
using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.AspNetCore.Authorization;
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
    public class EmployeeProfilePhotoController : Controller
    {
        private readonly IEmployeeProfilePhoto _employeeRepository;

        public EmployeeProfilePhotoController(IEmployeeProfilePhoto employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
       

        [HttpPost()]
        public async Task<IActionResult> UploadProfilePhotoUrl([FromForm] ProfilePhotoModel body)
        {
            if (body == null || body.File.Length == 0 || body.EmployeeId <= 0)
                return Ok(false);
            string guid = Guid.NewGuid().ToString();
            string fileExtension = body.File.FileName.Split(".").Last();
            string empId = body.EmployeeId.ToString();
            string fileName = guid + "." + fileExtension;
            string localPath = $"Resources/{empId}";
            if (!Directory.Exists(Path.Combine(
                      Directory.GetCurrentDirectory(), localPath)))
            {
                Directory.CreateDirectory(Path.Combine(
                       Directory.GetCurrentDirectory(), localPath));
            }
            var path = Path.Combine(
                     Directory.GetCurrentDirectory(), localPath,
                     fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await body.File.CopyToAsync(stream);
            }
            var pathDB = $"{localPath}/{fileName}";
            body.ProfilePhotoPath = pathDB;

            var res =  _employeeRepository.UploadProfilePhotoUrl(body.EmployeeId,body.ProfilePhotoPath);
            return Ok(res);
        }
    }
}
