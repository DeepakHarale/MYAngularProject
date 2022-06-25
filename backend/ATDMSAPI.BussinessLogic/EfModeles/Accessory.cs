using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class Accessory
    {
        public int AccessoriesId { get; set; }
        public int? AccessoriesStorageId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? DateOfIssues { get; set; }
        public DateTime? DateOfReturn { get; set; }
        public double? DamageCharges { get; set; }
        public int? Quantity { get; set; }
    }
}
