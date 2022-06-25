using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class DocumentDetail
    {
        public int DocumentId { get; set; }
        public int EmployeeId { get; set; }
        public int? DocumentTypeId { get; set; }
        public string DocumentName { get; set; }
        public string UniversityName { get; set; }
        public double? Percentage { get; set; }
        public int? PassYear { get; set; }
        public string DocumentPath { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
