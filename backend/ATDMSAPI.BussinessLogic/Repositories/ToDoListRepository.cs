using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class ToDoListRepository : IToDoListRepository
    {
        private AtdmsWebContext _AtdmsWebContext;

        public ToDoListRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        public async Task<ToDoList> AddToDoList(ToDoList toDoList)
        {
            if (!CheckToDoList(toDoList))
            {

                var result = await _AtdmsWebContext.ToDoLists.AddAsync(toDoList);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            {
                return toDoList;
            }
        }

        public bool CheckToDoList(ToDoList toDoList)
        {
            var result = _AtdmsWebContext.ToDoLists.Where(x => x.ToDoId.Equals(toDoList.ToDoId)).ToList();
            return result.Count() != 0;
        }

        public bool DeleteToDoList(int ToDoId)
        {
            try
            {
                ToDoList toDoList = _AtdmsWebContext.ToDoLists.FirstOrDefault(x => x.ToDoId.Equals(ToDoId));
                _AtdmsWebContext.ToDoLists.Remove(toDoList);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<ToDoList> GetToDoList()
        {
            return _AtdmsWebContext.ToDoLists.ToList();
        }


        public IEnumerable<ToDoList> GetToDoListByEmployeeId(int empId)
        {
            var data = _AtdmsWebContext.ToDoLists.Where(x => x.EmpId.Equals(empId)).ToList();
            return data;
        }

        public bool UpdateToDoList(ToDoList toDoList)
        {
            try
            {
                var entity = _AtdmsWebContext.ToDoLists.Where(x => x.ToDoId.Equals(toDoList.ToDoId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.ToDoId = toDoList.ToDoId;
                    entity.EmpId = toDoList.EmpId;
                    entity.Description = toDoList.Description;
                    entity.IsActive = toDoList.IsActive;

                    _AtdmsWebContext.ToDoLists.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }
    }
}
