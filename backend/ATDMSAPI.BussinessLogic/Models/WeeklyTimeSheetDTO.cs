using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
   public class WeeklyTimeSheetDTO
    {
     
           public WeeklyTimeSheet weeklyTimeSheet { get; set; }

         public ProjectTask projectTask { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }

        // employe info
        public string EmployeeNo { get; set; }
            public string EmployeeName { get; set; }
            public string MobileNo { get; set; }

    }

    public class WeeklyTimeSheetUpdate {
      public int TimeSheetID { get; set; }
        public int EmployeeId { get; set; }
        public int WeekNo { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
    }

}
