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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
       


        // role wise api call
        //[Authorize(Roles = "3")]
        [HttpGet()]      
        public IEnumerable<DocumentDetailsDTO> GetDocument()
        {
            return _employeeRepository.GetDocument();
        }

        [HttpGet()]
        public IEnumerable<EmployeeListDTO> GetEmployee()
        {
            return _employeeRepository.GetEmployee();
        }
        
        [HttpGet ,Route("NewlyJoinEmployee")]

        public IEnumerable<EmployeeDetail> GetNewlyJoinEmployee(DateTime fromDate,DateTime toDate)
        {
            return _employeeRepository.GetNewlyJoinEmployee(fromDate.ToUniversalTime(), toDate.ToUniversalTime());
        }


        [HttpGet()]
        public IEnumerable<DocumentType> GetDocumentType()
        {
            return _employeeRepository.GetDocumentType();
        }
        [HttpGet("{employeeId}")]
        public async Task<IEnumerable<DocumentDetailsDTO>> GetDocumentByEmployee(int employeeId)
        {
            return await _employeeRepository.GetDocumentByEmployee(employeeId);
        }
        [HttpPost()]
        public async Task<IActionResult> UploadDocumentEmployee([FromForm] DocumentModel body)
        {
            if (body == null || body.File.Length == 0 || body.document.EmployeeId <= 0)
                return Ok(false);
            string guid = Guid.NewGuid().ToString();
            string fileExtension = body.File.FileName.Split(".").Last();
            string empId = body.document.EmployeeId.ToString();
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
            body.document.DocumentPath = pathDB;
            body.document.UpdatedAt = DateTime.Now;
            body.document.CreatedAt = DateTime.Now;
            var res = await _employeeRepository.AddEmployeeDocument(body.document);
            return Ok(res);
        }

        [HttpPost()]
        public bool DeleteDocumentEmployee([FromBody] DocumentDetail document)
        {
            var res = _employeeRepository.DeleteDocumentDetails(document);
            string projectPath = Directory.GetCurrentDirectory();
            if (System.IO.File.Exists(Path.Combine(
                    projectPath, document.DocumentPath)))
            {
                System.IO.File.Delete(Path.Combine(projectPath, document.DocumentPath));               
                return res;
            }
            return res;
        }

        [HttpGet("{employeeId}")]
        public EmployeeRoleDocDTO GetEmployeeById(int employeeId)
        {
            return _employeeRepository.GetEmployeeById(employeeId);
        }

        [HttpPost()]
        public bool UpdateEmployee([FromBody] EmployeeListDTO employee)
        {
            return _employeeRepository.UpdateEmployeeDetails(employee);
        }
        [HttpPost()]
        public bool UpdateDocumentDetail([FromBody]  DocumentDetail docDetail)
        {
            return _employeeRepository.UpdateDocumentDetail(docDetail);
        }

    }
}
