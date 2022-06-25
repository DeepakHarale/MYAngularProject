using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;

using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using ATDMSAPI.BussinessLogic.Interfaces;
using System.Linq;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class HolidayRepository : IHolidayRepository
    {

        private readonly AtdmsWebContext _atdmsWebContext;

        public HolidayRepository(AtdmsWebContext atdmsWebContext)
        {
            _atdmsWebContext = atdmsWebContext;
        }

        public IEnumerable<HolidayDetail> GetHolidays()
        {
            return _atdmsWebContext.HolidayDetails.ToList();


        }
        public async Task<HolidayDetail> AddHolidayDeatils(HolidayDetail detail)
        {
            if (!CheckHolidayDetails(detail))
            {
                int? intIdt = _atdmsWebContext.HolidayDetails.Max(x => (int?)x.HolidayId);
                detail.HolidayId = intIdt.GetValueOrDefault(0) + 1;
                await _atdmsWebContext.HolidayDetails.AddAsync(detail);
                await _atdmsWebContext.SaveChangesAsync();
            }
                return detail;
            
        }

        //Check whether data is peresent or not.
        public bool CheckHolidayDetails(HolidayDetail detail)
        {
            var check = _atdmsWebContext.HolidayDetails.Where(x => x.HolidayType.ToLower().Equals(detail.HolidayType.ToLower())
                                                            || x.Date.Equals(detail.Date)
                                                            ).ToList();
            return check.Count() != 0;
        }
        public bool UpdateHolidayDeatils(HolidayDetail detail)
        {
            
            var updateObj = _atdmsWebContext.HolidayDetails.Where(x => x.HolidayId.Equals(detail.HolidayId)).FirstOrDefault();
            if (updateObj != null)
            {
                updateObj.HolidayType = detail.HolidayType;
                updateObj.Date = detail.Date;
                updateObj.Optional = detail.Optional;
                updateObj.HolidayType = detail.HolidayType;
                _atdmsWebContext.HolidayDetails.Update(updateObj);
                 _atdmsWebContext.SaveChanges();
                return true;
            }
            return false;
        }

        
        public bool DeleteHolidayDetails(HolidayDetail deleteHoliday)
        {
            try
            {
                _atdmsWebContext.HolidayDetails.Remove(deleteHoliday);
                _atdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
