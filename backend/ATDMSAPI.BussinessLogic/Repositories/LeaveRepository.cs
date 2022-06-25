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
    public class LeaveRepository : ILeaveRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public LeaveRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        
        public IEnumerable<LeaveDTO> Leave()
        {
          
                var data = (from l in _AtdmsWebContext.LeaveDetails
                            join lT in _AtdmsWebContext.LeaveTypes on l.LeaveTypeId equals lT.LeaveId
                            select new LeaveDTO()
                            {
                                leave = l,
                                leaveType = lT
                            }).ToList();
                return data;
            
        }


        public async Task<IEnumerable<LeaveDTO>> GetDocumentByLeave(int leaveId)
        {
            var data = await (from l in _AtdmsWebContext.LeaveDetails.Where(x => x.LeaveId.Equals(leaveId))
                              join lT in _AtdmsWebContext.LeaveTypes on l.LeaveTypeId equals lT.LeaveId
                              select new LeaveDTO()
                              {
                                  leave = l,
                                  leaveType = lT
                              }).ToListAsync();
            return data;
        }


        public IEnumerable<AllLeaveDTO> GetAllLeave()
        {                      
            var data = (from l in _AtdmsWebContext.LeaveDetails
                        join lT in _AtdmsWebContext.LeaveTypes on l.LeaveTypeId equals lT.LeaveId
                        join e in _AtdmsWebContext.EmployeeDetails on l.EmployeeId equals e.EmployeeId
                        select new AllLeaveDTO()
                        {
                            leave = l,
                            leaveType = lT,
                            employee=e
                        }).AsEnumerable().ToList();

            return data;            
        }     
         

        public IEnumerable<LeaveDTO> GetLeaveById(int employeeId)
        {
   
            var data = (from l in _AtdmsWebContext.LeaveDetails.Where(x=>x.EmployeeId.Equals(employeeId)) orderby l.LeaveTypeId                       
                        join lT in _AtdmsWebContext.LeaveTypes on l.LeaveTypeId equals lT.LeaveId 
                        select new LeaveDTO()
                        {
                            leave = l,
                            leaveType = lT
                        }).ToList();
            return data;
        }

        public async Task<LeaveDetail> AddLeaveDetail(LeaveDetail leaveDetail)
        {

            //If Data is present in DB avoid duplicate entry.
            if (!CheckLeaveDetails(leaveDetail))
            {
                if (String.IsNullOrEmpty(leaveDetail.LeaveStatus))
                {
                    leaveDetail.LeaveStatus = "PENDING";
                }
                var result = await _AtdmsWebContext.LeaveDetails.AddAsync(leaveDetail);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            return leaveDetail;
        }

        //Check whether data is peresent or not.+
        public bool CheckLeaveDetails(LeaveDetail leaveDetail)
        {

            var check = _AtdmsWebContext.LeaveDetails.Where(x => x.EmployeeId.Equals(leaveDetail.EmployeeId)
                                                            && x.FromDate.Equals(leaveDetail.FromDate)
                                                            && x.ToDate.Equals(leaveDetail.ToDate) 
                                                            ).ToList();

            return check.Count() != 0;
        }

        public bool UpdateLeaveDetail(LeaveDetail leaveDetail)
        {
            try
            {
                var entity = _AtdmsWebContext.LeaveDetails.Where(x => x.LeaveId.Equals(leaveDetail.LeaveId)).FirstOrDefault();
                if (entity != null)
                {                   
                    entity.LeaveTypeId = leaveDetail.LeaveTypeId;
                    entity.LeaveTypeFrom = leaveDetail.LeaveTypeFrom;
                    entity.FromDate = leaveDetail.FromDate;
                    entity.LeaveTypeTo = leaveDetail.LeaveTypeTo;
                    entity.ToDate = leaveDetail.ToDate;
                    entity.LeaveDescription = leaveDetail.LeaveDescription;
                    entity.CreatedBy = leaveDetail.CreatedBy;
                    entity.CreatedOn = leaveDetail.CreatedOn;
                    entity.LeaveStatus = leaveDetail.LeaveStatus.ToUpper();
                    entity.LeaveBalance = leaveDetail.LeaveBalance;
                    _AtdmsWebContext.LeaveDetails.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

        public bool UpdateLeaveStatus(int LeaveId,string status)
        {
            try
            {
                var entity = _AtdmsWebContext.LeaveDetails.Where(x => x.LeaveId.Equals(LeaveId)).FirstOrDefault();
                if (entity != null)
                {    
                     entity.LeaveStatus = status.ToUpper();
                     entity.CreatedOn = DateTime.Now;
                     _AtdmsWebContext.LeaveDetails.Update(entity);
                     _AtdmsWebContext.SaveChanges();
                      return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

        public bool DeleteLeaveDetail(int LeaveId)
        {
            try
            {
                LeaveDetail leave = _AtdmsWebContext.LeaveDetails.FirstOrDefault(x => x.LeaveId.Equals(LeaveId));
                _AtdmsWebContext.LeaveDetails.Remove(leave);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public IEnumerable<LeaveType> GetLeaveType()
        {
            return _AtdmsWebContext.LeaveTypes.ToList();
        }
    }
}
