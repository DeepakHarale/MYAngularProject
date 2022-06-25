using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
    public class ProjectDTO
    {
        public Project projects { get; set; }
        public ProjectTask projectTask { get; set; }

    }
}
