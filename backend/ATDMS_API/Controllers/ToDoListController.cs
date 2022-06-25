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
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly IToDoListRepository _toDoListRepository;
        public ToDoListController(IToDoListRepository toDoListRepository)
        {
            _toDoListRepository = toDoListRepository;
        }

        [HttpGet("GetToDoList")]
        public IEnumerable<ToDoList> GetToDoList()
        {
            return _toDoListRepository.GetToDoList();
        }

        [HttpGet("GetToDoListByEmployeeId/{empId}")]
        public IEnumerable<ToDoList> GetToDoListByEmployeeId(int empId)
        {
            return _toDoListRepository.GetToDoListByEmployeeId(empId);
        }

        

        [HttpPost("AddToDoList")]
        public async Task<IActionResult> AddToDoList([FromBody] ToDoList toDoList)
        {
            var res = await _toDoListRepository.AddToDoList(toDoList);
            return Ok(res);
        }


        [HttpPost("UpdateToDoList")]
        public bool UpdateToDoList([FromBody] ToDoList toDoList)
        {
            return _toDoListRepository.UpdateToDoList(toDoList);
        }

        [HttpPost("DeleteToDoList")]
        public bool DeleteToDoList(int ToDoId)
        {
            var res = _toDoListRepository.DeleteToDoList(ToDoId);

            return res;
        }
    }
}

