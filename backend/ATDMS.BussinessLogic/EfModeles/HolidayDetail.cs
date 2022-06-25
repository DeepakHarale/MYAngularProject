using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class HolidayDetail
    {
        public int HolidayId { get; set; }
        public string HolidayType { get; set; }
        public DateTime? Date { get; set; }
        public bool? Optional { get; set; }
        public DateTime? AddedOn { get; set; }
        public DateTime? AddedBy { get; set; }
    }
}
