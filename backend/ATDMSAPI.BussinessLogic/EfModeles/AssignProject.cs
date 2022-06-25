using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class AssignProject
    {
        public long AssignProjectId { get; set; }
        public int? ProjectId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? AddedOn { get; set; }
        public int? AddedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
