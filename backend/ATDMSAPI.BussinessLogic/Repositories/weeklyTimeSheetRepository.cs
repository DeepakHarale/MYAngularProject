using ATDMSAPI.BussinessLogic.EfModeles;

using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class weeklyTimeSheetRepository : ITimeSheetRepository
    {
        private readonly AtdmsWebContext _atdmsWebContext;

        public weeklyTimeSheetRepository(AtdmsWebContext atdmsWebContext)
        {
            _atdmsWebContext = atdmsWebContext;
        }

        public IEnumerable<WeeklyTimeSheetDTO> GetTimesheets(int WeekNo)
        {
            var result =  (from T in _atdmsWebContext.WeeklyTimeSheets.Where(x => x.WeekNo.Equals(WeekNo))
                                join E in _atdmsWebContext.EmployeeDetails on T.EmployeeId equals E.EmployeeId
                           join PT in _atdmsWebContext.ProjectTasks on T.ProjectsTaskId equals PT.ProjectsTaskId
                           join P in _atdmsWebContext.Projects on PT.ProjectId equals P.ProjectId
                                select new WeeklyTimeSheetDTO()
                                {
                                    weeklyTimeSheet = T,
                                    EmployeeName = E.EmployeeName,
                                    EmployeeNo = E.EmployeeNo,
                                    MobileNo = E.MobileNo,
                                   ProjectName =P.ProjectName,
        ProjectDescription =P.ProjectDescription,
        
        projectTask=PT
    }).ToList();
            return result;
        }

        public async Task<WeeklyTimeSheet> AddTimesheets(WeeklyTimeSheet Wtimesheet)
        {
            if (!ExistTimesheet(Wtimesheet))
            {
                Wtimesheet.TimeSheetId = 0;
                await _atdmsWebContext.WeeklyTimeSheets.AddAsync(Wtimesheet);
                await _atdmsWebContext.SaveChangesAsync();
                return Wtimesheet;
            }
            else
            {
                UpdateTimesheet(Wtimesheet);
                return Wtimesheet;
            }


        }
        public bool ExistTimesheet(WeeklyTimeSheet Wtimesheet)
        {
            var data = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.WeekNo.Equals(Wtimesheet.WeekNo) && x.EmployeeId.Equals(Wtimesheet.EmployeeId)).ToList();
            return data.Count() > 0 ? true : false;
        }
        public bool UpdateTimesheet(WeeklyTimeSheet Wtimesheet)
        {
            var updateObj = new WeeklyTimeSheet();
            var data = new WeeklyTimeSheet();
            if (Wtimesheet.TimeSheetId == 0)
            {
                data = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.WeekNo.Equals(Wtimesheet.WeekNo) && x.EmployeeId.Equals(Wtimesheet.EmployeeId)).FirstOrDefault();
            }
            else
            {
                data.TimeSheetId = Wtimesheet.TimeSheetId;
            }

            updateObj = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.TimeSheetId.Equals(data.TimeSheetId)).FirstOrDefault();
            if (updateObj != null)
            {
                updateObj.ProjectsTaskId = Wtimesheet.ProjectsTaskId;
                updateObj.EmployeeId = Wtimesheet.EmployeeId;
                updateObj.WeekNo = Wtimesheet.WeekNo;
                updateObj.Mondayhr = Wtimesheet.Mondayhr;
                updateObj.MondayDescription = Wtimesheet.MondayDescription;
                updateObj.MondayDate = Wtimesheet.MondayDate;
                updateObj.Tuesdayhr = Wtimesheet.Tuesdayhr;
                updateObj.TuesdayDescription = Wtimesheet.TuesdayDescription;
                updateObj.TuesdayDate = Wtimesheet.TuesdayDate;
                updateObj.Wednesdayhr = Wtimesheet.Wednesdayhr;
                updateObj.WednesdayDescription = Wtimesheet.WednesdayDescription;
                updateObj.WednesdayDate = Wtimesheet.WednesdayDate;
                updateObj.Thursdayhr = Wtimesheet.Thursdayhr;
                updateObj.ThursdayDescription = Wtimesheet.ThursdayDescription;
                updateObj.ThursdayDate = Wtimesheet.ThursdayDate;
                updateObj.Fridayhr = Wtimesheet.Fridayhr;
                updateObj.FridayDescription = Wtimesheet.FridayDescription;
                updateObj.FridayDate = Wtimesheet.FridayDate;
                updateObj.Saturdayhr = Wtimesheet.Saturdayhr;
                updateObj.SaturdayDescription = Wtimesheet.SaturdayDescription;
                updateObj.SaturdayDate = Wtimesheet.SaturdayDate;
                updateObj.Sundayhr = Wtimesheet.Sundayhr;
                updateObj.SundayDescription = Wtimesheet.SundayDescription;
                updateObj.SundayDate = Wtimesheet.SundayDate;
                updateObj.CreatedBy = Wtimesheet.CreatedBy;
                updateObj.CreatedOn = Wtimesheet.CreatedOn;
                updateObj.Status = Wtimesheet.Status;
                updateObj.Reason = Wtimesheet.Reason;
                _atdmsWebContext.WeeklyTimeSheets.Update(updateObj);
                _atdmsWebContext.SaveChanges();
                return true;
            }
            return false;
        }
        public bool DeleteTimesheet(int TimeSheetId)
        {
            try
            {
              var  updateObj = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.TimeSheetId.Equals(TimeSheetId)).FirstOrDefault();
                if (updateObj!=null)
                {
                    _atdmsWebContext.WeeklyTimeSheets.Remove(updateObj);
                    _atdmsWebContext.SaveChanges();
                    return true;

                }
                return false;

            }
            catch (Exception)
            {
                return false;
            }

        }

        public async Task<int> AddTimesheetBulk(List<WeeklyTimeSheet> Wtimesheet)
        {
            int i = 0;
            foreach (var s in Wtimesheet)
            {
                if (s.TimeSheetId <= 0)
                {
                    await _atdmsWebContext.WeeklyTimeSheets.AddAsync(s);
                    await _atdmsWebContext.SaveChangesAsync();
                }
                else
                {
                    UpdateTimesheet(s);

                }
                i++;

            }
            return i;

        }



        //public async Task<IEnumerable<DocumentDetailsDTO>> GetProjectDeatails(int weekID)
        //{
        //    var data = await (from pDeatils in _atdmsWebContext.ProjectTasks.Where(x => x.ProjectId.Equals(weekID))

        //                      join PTask in _atdmsWebContext.Projects on pDeatils.ProjectsTaskId equals PTask.ProjectId

        //                      select new WeeklyTimeSheetDTO()
        //                      {
        //                          Project = PTask,
        //                          projectTask = pDeatils
        //                      }).ToListAsync();
        //    return (IEnumerable<DocumentDetailsDTO>)data;
        //}

        public IEnumerable<WeeklyTimeSheet> GetWeekTimeSheetByWeekId(int weekno, int emploeeId)
        {
            var data = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.WeekNo.Equals(weekno) && x.EmployeeId.Equals(emploeeId)).AsEnumerable().ToList();
            return data;
        }


        public WeeklyTimeSheet GetWeekId(int WeekId)
        {
            var data = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.TimeSheetId.Equals(WeekId)).FirstOrDefault();

            return data;
        }

        public IEnumerable<WeeklyTimeSheet> GetEmployeeID(int EmployeeId)
        {
            var data = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.EmployeeId.Equals(EmployeeId)).ToList();
            return data;
        }

        public bool TimeSheetStatusUpdate(WeeklyTimeSheetUpdate weeklyTimeSheet)
        {
            var data = _atdmsWebContext.WeeklyTimeSheets.Where(x => x.EmployeeId.Equals(weeklyTimeSheet.EmployeeId) && x.WeekNo.Equals(weeklyTimeSheet.WeekNo)).ToList();
            if (data.Count > 0)
            {
                foreach(var item in data)
                {
                    item.Status = weeklyTimeSheet.Status;
                    item.Reason = weeklyTimeSheet.Reason;
                }
                _atdmsWebContext.UpdateRange(data);
                _atdmsWebContext.SaveChanges();
                return true;
            }

            return false;
        }
    }
}