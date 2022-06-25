using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
  public interface IHolidayRepository
    {
        IEnumerable<HolidayDetail> GetHolidays();
        Task<HolidayDetail> AddHolidayDeatils(HolidayDetail detail);
       bool DeleteHolidayDetails(HolidayDetail deleteHoliday);
        bool UpdateHolidayDeatils(HolidayDetail detail);


    }
}
