using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class EmpInfo
    {
        public int EmpInfoId { get; set; }
        public int EmpId { get; set; }
        public string BloodGroup { get; set; }
        public DateTime? Anniversary { get; set; }
        public string SkillSet { get; set; }
        public string EmgContNo { get; set; }
        public string PersonalEmail { get; set; }
    }
}
