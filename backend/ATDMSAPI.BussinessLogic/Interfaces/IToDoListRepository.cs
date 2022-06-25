using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IToDoListRepository
    {
        IEnumerable<ToDoList> GetToDoList();

        IEnumerable<ToDoList> GetToDoListByEmployeeId(int empId);

        Task<ToDoList> AddToDoList(ToDoList toDoList);

        
        bool UpdateToDoList(ToDoList toDoList);

        bool DeleteToDoList(int ToDoId);

    }
}
