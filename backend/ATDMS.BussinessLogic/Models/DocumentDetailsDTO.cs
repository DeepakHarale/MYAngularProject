using ATDMS.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMS.BussinessLogic.Models
{
   public class DocumentDetailsDTO
    {      
        public DocumentDetails document { get; set; }
        public DocumentType documentType { get; set; }
    }
}
