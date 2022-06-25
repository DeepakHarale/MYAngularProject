using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class Module
    {
        public int ModuleId { get; set; }
        public int? ParentModuleId { get; set; }
        public string ModuleName { get; set; }
        public string ModuleDesc { get; set; }
        public DateTime? AddedOn { get; set; }
        public int? AddedBy { get; set; }
        public bool? IsActive { get; set; }
        public int? OrderById { get; set; }
    }
}
