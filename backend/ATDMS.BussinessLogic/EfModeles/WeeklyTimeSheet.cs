using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class WeeklyTimeSheet
    {
        public int TimeSheetId { get; set; }
        public int ProjectsTaskId { get; set; }
        public int EmployeeId { get; set; }
        public int WeekNo { get; set; }
        public double? Mondayhr { get; set; }
        public string MondayDescription { get; set; }
        public DateTime? MondayDate { get; set; }
        public double? Tuesdayhr { get; set; }
        public string TuesdayDescription { get; set; }
        public DateTime? TuesdayDate { get; set; }
        public double? Wednesdayhr { get; set; }
        public string WednesdayDescription { get; set; }
        public DateTime? WednesdayDate { get; set; }
        public double? Thursdayhr { get; set; }
        public string ThursdayDescription { get; set; }
        public DateTime? ThursdayDate { get; set; }
        public double? Fridayhr { get; set; }
        public string FridayDescription { get; set; }
        public DateTime? FridayDate { get; set; }
        public double? Saturdayhr { get; set; }
        public string SaturdayDescription { get; set; }
        public DateTime? SaturdayDate { get; set; }
        public double? Sundayhr { get; set; }
        public string SundayDescription { get; set; }
        public DateTime? SundayDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string Status { get; set; }
    }
}
