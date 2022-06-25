using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMSAPI.BussinessLogic.Models
{
   public class DocumentDetailsDTO
    {      
        public DocumentDetail document { get; set; }
        public DocumentType documentType { get; set; }
    }
}
