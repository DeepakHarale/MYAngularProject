using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class EmployeeProject
    {
        public int Id { get; set; }
        public int ProjectTasksId { get; set; }
        public int EmployeeId { get; set; }
    }
}
