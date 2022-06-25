using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class LeaveDetail
    {
        public int LeaveId { get; set; }
        public int? LeaveTypeId { get; set; }
        public string LeaveTypeFrom { get; set; }
        public DateTime? FromDate { get; set; }
        public string LeaveTypeTo { get; set; }
        public DateTime? ToDate { get; set; }
        public string LeaveDescription { get; set; }
        public int EmployeeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string LeaveStatus { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public decimal? LeaveBalance { get; set; }
    }
}
