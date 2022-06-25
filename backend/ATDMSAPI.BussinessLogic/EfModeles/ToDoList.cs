using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class ToDoList
    {
        public int ToDoId { get; set; }
        public int? EmpId { get; set; }
        public string Description { get; set; }
        public bool? IsActive { get; set; }
    }
}
