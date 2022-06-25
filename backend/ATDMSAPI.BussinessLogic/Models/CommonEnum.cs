using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
   public enum LeaveStatus
    {
        PENDING,
        APPROVED,
        REHECTED
    }

    public enum TimeSheetStatus
    {
        PENDING,
        SUBMITTED,
        APPROVED
    }
    public enum Permissions
    {
        ADD,
        EDIT,
        DELETE,
        VIEW

    }
    public enum Leaves
    {
       
        EARNED=1,
        CASUAL=2,
        LWP=3,
        BIRTHDAY=4,
        ANNIVARSARY=5,
        COMPENSATORY_OFF=6,
        MATTERNITY=7,
        PATERNITY=8,
        MISCARIAGE=9,
        ADOPTION=10

    }
    public enum LeaveTypeFH
    {
        Half_day,
        Full_day
    }
}
