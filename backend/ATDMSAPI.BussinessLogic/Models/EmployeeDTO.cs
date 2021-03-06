using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Text;

namespace ATDMSAPI.BussinessLogic.Models
{
  public class EmployeeDTO
    {
        public EmployeeDetail employee { get; set; }
        public List<DocumentDetailsDTO> documentsList { get; set; }
    }

    public class EmployeeRoleDocDTO
    {
        public EmployeeListDTO employee { get; set; }
        public List<DocumentDetailsDTO> documentsList { get; set; }     

    }

    public class EmployeePhotoUrlDTO
    {
        public int EmployeeId { get; set; }
        public string ProfilePhotoPath { get; set; }

    }
    public class EmployeeListDTO
    {
        public int EmployeeId { get; set; }
        public int UserId { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string MothersName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string MaritalStatus { get; set; }
        public string SpouseName { get; set; }
        public string ChildName1 { get; set; }
        public string ChildName2 { get; set; }
        public string PaddressLine1 { get; set; }
        public string PaddressLine2 { get; set; }
        public string Pcity { get; set; }
        public string Pstate { get; set; }
        public string Ppincode { get; set; }
        public bool? IsSameAddress { get; set; }
        public string CaddressLine1 { get; set; }
        public string CaddressLine2 { get; set; }
        public string Ccity { get; set; }
        public string Cpstate { get; set; }
        public string Cpincode { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string Division { get; set; }
        public string Department { get; set; }
        public string EmployeeStatus { get; set; }
        public string ProfilePhotoPath { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public string RoleName { get; set; }
        public int RoleId { get; set; }
        public string EmergencyNo { get; set; }

    }
}
