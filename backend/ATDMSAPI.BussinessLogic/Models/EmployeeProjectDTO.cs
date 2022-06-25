using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
   public class EmployeeProjectDTO
    {
        public EmployeeDetail employee { get; set; }

        public EmployeeProject employeeProject { get; set; }

        public ProjectTask projectTask { get; set; }

        public Project project { get; set; }
    }
}
