using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class Timesheet
    {
        public int WorkingHourId { get; set; }
        public DateTime WorkingDay { get; set; }
        public double WorkingHour { get; set; }
        public int EmployeeId { get; set; }
        public int WeekOfYear { get; set; }
        public int ProjectsTaskId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
