using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface ITimeSheetRepository
    {
        IEnumerable<WeeklyTimeSheetDTO> GetTimesheets(int WeekNo);
        Task<WeeklyTimeSheet> AddTimesheets(WeeklyTimeSheet Wtimesheet);
        Task<int> AddTimesheetBulk(List<WeeklyTimeSheet> Wtimesheet);
        bool UpdateTimesheet(WeeklyTimeSheet Wtimesheet);
        bool DeleteTimesheet(int TimeSheetId);      
        IEnumerable<WeeklyTimeSheet> GetWeekTimeSheetByWeekId(int weekno, int emploeeId);
        WeeklyTimeSheet GetWeekId(int WeekId);
        IEnumerable<WeeklyTimeSheet> GetEmployeeID(int EmployeeId);

        bool TimeSheetStatusUpdate(WeeklyTimeSheetUpdate weeklyTimeSheet);
    }
}
