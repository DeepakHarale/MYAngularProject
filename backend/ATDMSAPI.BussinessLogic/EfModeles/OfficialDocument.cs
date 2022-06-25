using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class OfficialDocument
    {
        public int DocumentId { get; set; }
        public string ReferenceNo { get; set; }
        public string DocumentName { get; set; }
        public string EmployeeName { get; set; }
        public string Designation { get; set; }
        public DateTime? DocumentDate { get; set; }
        public double? Ctc { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string Status { get; set; }
    }
}
