using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Helpers;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class LeaveManagementRepository : LeaveRepository, ILeaveManagementRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;
        public LeaveManagementRepository(AtdmsWebContext AtdmsWebContext) : base(AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public IEnumerable<EmplyeeLeaveDTO> GetAvailableLeavesOfEmployee(int employeeId)
        {
            IEnumerable<EmplyeeLeaveDTO> Taken = GetLeavesTakenByEmployee(employeeId);

            IEnumerable<LeaveType> Assigned = GetLeavesAssignedToEmployee(employeeId);


           IEnumerable<EmplyeeLeaveDTO> availableLeaves = LeaveCalculation(Taken, Assigned);

            return availableLeaves;
        }

        public EmployeeDetailsDTO GetEmployeeDetails(int employeeId)
        {
            var data = _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeId.Equals(employeeId)).FirstOrDefault();

            var emp = new EmployeeDetailsDTO()
            {
                employeeId = data.EmployeeId,
                Gender = data.Gender,
                DateOfBirth = data.DateOfBirth,
                JoiningDate = data.JoiningDate
            };
            return emp;
        }

        public IEnumerable<LeaveType> GetLeavesAssignedToEmployee(int employeeId)
        {
            IEnumerable<LeaveType> DefaultAssignedLeaves = GetLeaveType();

            EmployeeDetailsDTO empDetails = GetEmployeeDetails(employeeId);

            IEnumerable<LeaveType> AssignedLeavesAsPerRule = ApplyCompanyLeaveRules(DefaultAssignedLeaves, empDetails);

            return DefaultAssignedLeaves;
        }

        private IEnumerable<LeaveType> ApplyCompanyLeaveRules(IEnumerable<LeaveType> defaultAssignedLeaves, EmployeeDetailsDTO empDetails)
        {
            DateTime BDate = Convert.ToDateTime(empDetails.DateOfBirth);

            DateTime jDate = Convert.ToDateTime(empDetails.JoiningDate);
            foreach (LeaveType leaveType in defaultAssignedLeaves)
            {
                double LeaveCount = GetAccumilatedLeavesForEmployee(leaveType.LeaveId,(double) leaveType.AssignedDays, empDetails);
                switch (leaveType.LeaveId)
                {
                    case(int) Leaves.EARNED: 
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.EARNED)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.CASUAL:
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.CASUAL)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.LWP:
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.LWP)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.BIRTHDAY:
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.BIRTHDAY)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.ANNIVARSARY:
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.ANNIVARSARY)).Select(c => { c.AssignedDays = 0; return c; }).ToList();
                        break;
                    case (int)Leaves.COMPENSATORY_OFF:
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.COMPENSATORY_OFF)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.MATTERNITY:
                        if (empDetails.Gender == "Male")                        
                            defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.MATTERNITY)).Select(c => { c.AssignedDays = 0; return c; }).ToList();
                        else
                            defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.MATTERNITY)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.PATERNITY:
                        if (empDetails.Gender == "Female")
                            defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.PATERNITY)).Select(c => { c.AssignedDays = 0; return c; }).ToList();
                        else
                            defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.PATERNITY)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.MISCARIAGE:
                        if (empDetails.Gender == "Male")
                            defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.MISCARIAGE)).Select(c => { c.AssignedDays = 0; return c; }).ToList();
                        else
                            defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.MISCARIAGE)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                    case (int)Leaves.ADOPTION:
                        defaultAssignedLeaves.Where(c => c.LeaveId.Equals((int)Leaves.ADOPTION)).Select(c => { c.AssignedDays = (decimal)(LeaveCount); return c; }).ToList();
                        break;
                }               
            }          
            return defaultAssignedLeaves;
        }


        private double GetAccumilatedLeavesForEmployee(int leaveTypeId,double assignDays, EmployeeDetailsDTO empDetails)
        {
            double lCnt = 0;            
            DateTime from; DateTime BDate;

            var data = (from l in _AtdmsWebContext.LeaveDetails.Where(x => x.EmployeeId.Equals(empDetails.employeeId)
                        && x.LeaveTypeId.Equals(leaveTypeId))
                        select new EmplyeeLeaveDTO()
                        {
                            leaveId = (int)l.LeaveTypeId,
                            leaveCount = (double)l.LeaveBalance
                        }
                        ).ToList().LastOrDefault();

            if (data != null)
                lCnt = data.leaveCount;
            else
            {
                switch (leaveTypeId)
                {
                    case (int)Leaves.EARNED:
                      
                        from = Convert.ToDateTime(empDetails.JoiningDate);                        
                        DateTime to = DateTime.Now;
                        if (from.Year != 0001)
                        {
                            double monthDiff = Math.Abs((to.Year * 12 + (to.Month - 1)) - (from.Year * 12 + (from.Month - 1)));
                            if (from.Day < 15)
                            {
                                monthDiff++;
                            }
                           lCnt = monthDiff;                           
                        }
                        break;
                    case (int)Leaves.CASUAL:
                        from = Convert.ToDateTime(empDetails.JoiningDate);
                        DateTime current = DateTime.Now; double casualmonthDiff = 0;
                        if (from.Year != current.Year)
                        {
                            from = new DateTime(current.Year, 1, 1);
                        }
                        
                        if (from.Year != 0001 )
                            casualmonthDiff = Math.Abs((current.Year * 12 + (current.Month - 1)) - (from.Year * 12 + (from.Month - 1)));                          
                       
                        if ((from.Day < 15 ))
                        {
                            casualmonthDiff++;
                        }

                        if (casualmonthDiff != 0)
                            lCnt = casualmonthDiff / 2;
                        else
                            lCnt = 0;
                        break;
                    case (int)Leaves.LWP:
                        lCnt = assignDays; 

                        break;
                    case (int)Leaves.BIRTHDAY:                        
                        BDate = Convert.ToDateTime(empDetails.DateOfBirth);
                        if (leaveTypeId == (int)Leaves.BIRTHDAY && BDate.Month == DateTime.Now.Month)                       
                            lCnt = 1;                        
                        else
                            lCnt = assignDays;

                        break;
                    case (int)Leaves.ANNIVARSARY:
                        lCnt = assignDays;
                        break;
                    case (int)Leaves.COMPENSATORY_OFF:
                        lCnt = assignDays;
                        break;
                    case (int)Leaves.MATTERNITY:
                        lCnt = assignDays;
                        break;
                    case (int)Leaves.PATERNITY:
                        lCnt = assignDays;
                        break;
                    case (int)Leaves.MISCARIAGE:
                        lCnt = assignDays;
                        break;
                    case (int)Leaves.ADOPTION:
                        lCnt = assignDays;
                        break;

                }               
            }
            return lCnt;
        }

        public IEnumerable<EmplyeeLeaveDTO> GetLeavesTakenByEmployee(int employeeId)
        {
            IEnumerable<LeaveDTO> EmployeeLeaves = GetLeaveById(employeeId);
            double leavecnt = 0;
            IEnumerable<EmplyeeLeaveDTO> Sorteddata;

            List<EmplyeeLeaveDTO> leaveList = new List<EmplyeeLeaveDTO>();

            foreach (var l in EmployeeLeaves)
            {
                if (l.leave != null)
                {
                    leavecnt = getcount(l.leave.FromDate, l.leave.ToDate, l.leave.LeaveTypeFrom, l.leave.LeaveTypeTo);
                    EmplyeeLeaveDTO leaverow = new EmplyeeLeaveDTO();
                    leaverow.leaveId = (int)l.leave.LeaveTypeId;
                    leaverow.leaveCount = leavecnt;
                    leaveList.Add(leaverow);
                }
            }


            Sorteddata = leaveList.GroupBy(t => t.leaveId)
                          .Select(t => new EmplyeeLeaveDTO
                          {
                              leaveId = t.Key,
                              leaveCount = t.Sum(ta => ta.leaveCount),
                          }).ToList();

            return Sorteddata;
        }

        public double getcount1(DateTime? fromDate, DateTime? toDate, string leaveTypeFrom, string leaveTypeTo)
        {
            int halfDayCount = 0; double days = 0;
            int fullDayCount = 0; 
            if (leaveTypeFrom.Equals("Half Day"))
            {
                halfDayCount++;
            }
            if (leaveTypeTo.Equals("Half Day"))
            {
                halfDayCount++;
            }
            if (leaveTypeFrom.Equals("Full Day"))
            {
                fullDayCount++;
            }
            if (leaveTypeTo.Equals("Full Day"))
            {
                fullDayCount++;
            }

            TimeSpan diff = Convert.ToDateTime(toDate) - Convert.ToDateTime(fromDate);
            if (diff.Days == 0 && leaveTypeFrom.Equals("Full Day"))
                days = diff.Days + 0 + halfDayCount * 0.5;
            else if (diff.Days == 0 && leaveTypeFrom.Equals("Half Day"))
                days = halfDayCount * 0.5;
            else
                days = diff.Days +0 + fullDayCount + halfDayCount * 0.5;

            return days;

        }

        public double getcount(DateTime? fromDate, DateTime? toDate, string leaveTypeFrom, string leaveTypeTo)
        {
            double days = 0;
            TimeSpan diff = Convert.ToDateTime(toDate) - Convert.ToDateTime(fromDate);
            
                days = diff.Days+1;

            if (leaveTypeFrom == "Half Day" || leaveTypeTo == "Half Day")
            {
                days = days - 0.5;
            }
            if (leaveTypeFrom == "Half Day" && leaveTypeTo == "Half Day")
            {
                days = days - 0.5;
            }
            if (leaveTypeFrom == leaveTypeTo && leaveTypeTo == "Half Day")
            {
                days =  0.5;
            }
            if (leaveTypeFrom == leaveTypeTo && leaveTypeTo == "full Day")
            {
                days = 1;
            }

            return days;

        }
        public IEnumerable<EmplyeeLeaveDTO> LeaveCalculation(IEnumerable<EmplyeeLeaveDTO> TakenLeaves, IEnumerable<LeaveType> AssignedLeaves)
        {
           // double remainingLeaves = 0;
            List<EmplyeeLeaveDTO> listofLeaves = new List<EmplyeeLeaveDTO>();

            foreach (var assignleave in AssignedLeaves)
            {
                //var tLeave = (from Taken in TakenLeaves
                //              where Taken.leaveId == assignleave.LeaveId
                //              select Taken).FirstOrDefault();

                EmplyeeLeaveDTO newRow = new EmplyeeLeaveDTO();
                //if (tLeave != null)
                //{
                //    if (tLeave.leaveId == assignleave.LeaveId)
                //    {
                //        remainingLeaves = Convert.ToDouble(assignleave.AssignedDays);// - tLeave.leaveCount;
                //        newRow.leaveId = tLeave.leaveId;
                //        newRow.leaveCount = remainingLeaves;
                //        listofLeaves.Add(newRow);

                //    }
                //}
                //else
                //{
                    newRow.leaveId = assignleave.LeaveId;
                    newRow.leaveCount = Convert.ToDouble(assignleave.AssignedDays);
                    listofLeaves.Add(newRow);

                //}


            }
            return listofLeaves;
        }

    }
}
