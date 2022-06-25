using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class ProjectTask
    {
        public int ProjectsTaskId { get; set; }
        public string ProjectsTaskType { get; set; }
        public int ProjectId { get; set; }
        public string ProjectDescription { get; set; }
        public int? Prorities { get; set; }
        public int? WorkingHours { get; set; }
    }
}
