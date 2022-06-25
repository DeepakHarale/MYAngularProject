using ATDMSAPI.BussinessLogic.EfModeles;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Models
{
    public class HighlightsModel
    {
        public Highlight highlights { get; set; }
        public IFormFile File { get; set; }

    }
}
