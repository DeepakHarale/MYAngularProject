using ATDMS.BussinessLogic.EfModeles;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS.Models
{
    public class DocumentModel
    {
        public DocumentDetails document { get; set; }
        public IFormFile File { get; set; }
    }
}
