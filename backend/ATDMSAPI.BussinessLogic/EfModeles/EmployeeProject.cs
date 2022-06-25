using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class EmployeeProject
    {
        public int Id { get; set; }
        public int? ProjectTasksId { get; set; }
        public int? EmployeeId { get; set; }
        public int? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
