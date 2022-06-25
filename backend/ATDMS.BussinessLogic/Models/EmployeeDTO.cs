using ATDMS.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMS.BussinessLogic.Models
{
  public class EmployeeDTO
    {
        public EmployeeDetails employee { get; set; }
        public List<DocumentDetailsDTO> documentsList { get; set; }
    }
}
