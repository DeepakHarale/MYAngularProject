using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using ATDMSAPI.BussinessLogic.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class EmployeeRepository : UserRepository, IEmployeeRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

       
        public EmployeeRepository(AtdmsWebContext AtdmsWebContext) : base(AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }


        public IEnumerable<DocumentDetailsDTO> GetDocument()
        {
            var data = (from doc in _AtdmsWebContext.DocumentDetails
                        join docType in _AtdmsWebContext.DocumentTypes on doc.DocumentTypeId equals docType.DocumentId
                        select new DocumentDetailsDTO()
                        {
                            document = doc,
                            documentType = docType
                        }).ToList();
            return data;
        }

        
        public IEnumerable<DocumentType> GetDocumentType()
        {
            return _AtdmsWebContext.DocumentTypes.ToList();
        }

        
        public IEnumerable<EmployeeListDTO> GetEmployee()
        {
            //_AtdmsWebContext.EmployeeDetails.ToList();
            var data = (from emp in _AtdmsWebContext.EmployeeDetails
                        join user in _AtdmsWebContext.UserDetails on emp.UserId equals user.UserId
                        join map in _AtdmsWebContext.UserRoleMappingDetails on emp.UserId equals map.UserId
                        join role in _AtdmsWebContext.RoleMasters on map.RoleId equals role.RoleId
                        select new EmployeeListDTO()
                        {
                            EmployeeId = emp.EmployeeId,
                            UserId = emp.UserId,
                            EmployeeNo = emp.EmployeeNo,
                            EmployeeName = emp.EmployeeName,
                            MobileNo = emp.MobileNo,
                            EmailId = emp.EmailId,
                            FirstName = emp.FirstName,
                            MiddleName = emp.MiddleName,
                            LastName = emp.LastName,
                            Gender = emp.Gender,
                            MothersName = emp.MothersName,
                            DateOfBirth = emp.DateOfBirth,
                            MaritalStatus = emp.MaritalStatus,
                            SpouseName = emp.SpouseName,
                            ChildName1 = emp.ChildName1,
                            ChildName2 = emp.ChildName2,
                            PaddressLine1 = emp.PaddressLine1,
                            PaddressLine2 = emp.PaddressLine2,
                            Pcity = emp.Pcity,
                            Pstate = emp.Pstate,
                            Ppincode = emp.Ppincode,
                            IsSameAddress = emp.IsSameAddress,
                            CaddressLine1 = emp.CaddressLine1,
                            CaddressLine2 = emp.CaddressLine2,
                            Ccity = emp.Ccity,
                            Cpstate = emp.Cpstate,
                            Cpincode = emp.Cpincode,
                            JoiningDate = emp.JoiningDate,
                            Division = emp.Division,
                            Department = emp.Department,
                            EmployeeStatus = emp.EmployeeStatus,
                            ProfilePhotoPath = emp.ProfilePhotoPath,
                            CreatedAt = emp.CreatedAt,
                            UpdatedAt = emp.UpdatedAt,
                            CreatedBy = emp.CreatedBy,
                            UpdatedBy = emp.UpdatedBy,
                            RoleName = role.RoleName,
                            RoleId = role.RoleId,
                            EmergencyNo = emp.EmergencyNo
                        }).ToList();

            return data;
        }
        public async Task<IEnumerable<DocumentDetailsDTO>> GetDocumentByEmployee(int employeeId)
        {
            var data = await (from doc in _AtdmsWebContext.DocumentDetails.Where(x => x.EmployeeId.Equals(employeeId))
                              join docType in _AtdmsWebContext.DocumentTypes on doc.DocumentTypeId equals docType.DocumentId
                              select new DocumentDetailsDTO()
                              {
                                  document = doc,
                                  documentType = docType
                              }).ToListAsync();
            return data;
        }

        public bool UpdateDocumentDetail(DocumentDetail docDetail)
        {
            try
            {
                var entity = _AtdmsWebContext.DocumentDetails.Where(x => x.DocumentId.Equals(docDetail.DocumentId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.DocumentTypeId = docDetail.DocumentTypeId;
                    entity.DocumentName = docDetail.DocumentName;
                    entity.UniversityName= docDetail.UniversityName;
                    entity.Percentage = docDetail.Percentage;
                    entity.PassYear = docDetail.PassYear;
                    entity.UpdatedAt = DateTime.Now;
                   
                    _AtdmsWebContext.DocumentDetails.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }


        public async Task<DocumentDetail> AddEmployeeDocument(DocumentDetail document)
        {
            await _AtdmsWebContext.DocumentDetails.AddAsync(document);
            await _AtdmsWebContext.SaveChangesAsync();
            return document;
        }
        public bool DeleteDocumentDetails(DocumentDetail document)
        {
            try
            {
                _AtdmsWebContext.DocumentDetails.Remove(document);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }
        //public bool UpdateDocumentDetail(DocumentDetail docDetail)
        //{
        //    try
        //    {
        //        var entity = _AtdmsWebContext.DocumentDetails.Where(x => x.DocumentId.Equals(docDetail.DocumentId)).FirstOrDefault();
        //        if (entity != null)
        //        {
        //            entity.DocumentTypeId = docDetail.DocumentTypeId;
        //            entity.DocumentName = docDetail.DocumentName;
        //            entity.UniversityName = docDetail.UniversityName;
        //            entity.Percentage = docDetail.Percentage;
        //            entity.PassYear = docDetail.PassYear;
        //            entity.UpdatedAt = DateTime.Now;

        //            _AtdmsWebContext.DocumentDetails.Update(entity);
        //            _AtdmsWebContext.SaveChanges();
        //            return true;
        //        }
        //        return false;
        //    }
        //    catch
        //    {
        //        return false;
        //    }

        //}

        public EmployeeRoleDocDTO GetEmployeeById(int employeeId)
        {
            var data = (from emp in _AtdmsWebContext.EmployeeDetails.Where(x=>x.EmployeeId.Equals (employeeId))
                        join user in _AtdmsWebContext.UserDetails on emp.UserId equals user.UserId
                        join map in _AtdmsWebContext.UserRoleMappingDetails on emp.UserId equals map.UserId
                        join role in _AtdmsWebContext.RoleMasters on map.RoleId equals role.RoleId
                        select new EmployeeListDTO()
                        {
                            EmployeeId = emp.EmployeeId,
                            UserId = emp.UserId,
                            EmployeeNo = emp.EmployeeNo,
                            EmployeeName = emp.EmployeeName,
                            MobileNo = emp.MobileNo,
                            EmailId = emp.EmailId,
                            FirstName = emp.FirstName,
                            MiddleName = emp.MiddleName,
                            LastName = emp.LastName,
                            Gender = emp.Gender,
                            MothersName = emp.MothersName,
                            DateOfBirth = emp.DateOfBirth,
                            MaritalStatus = emp.MaritalStatus,
                            SpouseName = emp.SpouseName,
                            ChildName1 = emp.ChildName1,
                            ChildName2 = emp.ChildName2,
                            PaddressLine1 = emp.PaddressLine1,
                            PaddressLine2 = emp.PaddressLine2,
                            Pcity = emp.Pcity,
                            Pstate = emp.Pstate,
                            Ppincode = emp.Ppincode,
                            IsSameAddress = emp.IsSameAddress,
                            CaddressLine1 = emp.CaddressLine1,
                            CaddressLine2 = emp.CaddressLine2,
                            Ccity = emp.Ccity,
                            Cpstate = emp.Cpstate,
                            Cpincode = emp.Cpincode,
                            JoiningDate = emp.JoiningDate,
                            Division = emp.Division,
                            Department = emp.Department,
                            EmployeeStatus = emp.EmployeeStatus,
                            ProfilePhotoPath = emp.ProfilePhotoPath,
                            CreatedAt = emp.CreatedAt,
                            UpdatedAt = emp.UpdatedAt,
                            CreatedBy = emp.CreatedBy,
                            UpdatedBy = emp.UpdatedBy,
                            RoleName = role.RoleName,
                            RoleId = role.RoleId,
                            EmergencyNo=emp.EmergencyNo
                        }).FirstOrDefault();

            var data1 = (from doc in _AtdmsWebContext.DocumentDetails.Where(x => x.EmployeeId.Equals(employeeId))
                         join docType in _AtdmsWebContext.DocumentTypes on doc.DocumentTypeId equals docType.DocumentId
                         select new DocumentDetailsDTO()
                         {
                             document = doc,
                             documentType = docType

                         }).ToList();

            var empRoleDocDetails = new EmployeeRoleDocDTO() { employee = data, documentsList = data1 };
            return empRoleDocDetails;

        }

        public bool UpdateEmployeeDetails(EmployeeListDTO employee)
        {
            try
            {
                var entity = _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeId.Equals(employee.EmployeeId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.FirstName = employee.FirstName;
                    entity.MiddleName = employee.MiddleName;
                    entity.LastName = employee.LastName;
                    entity.Gender = employee.Gender;
                    entity.MothersName = employee.MothersName;
                    entity.DateOfBirth = employee.DateOfBirth;
                    entity.MaritalStatus = employee.MaritalStatus;
                    entity.SpouseName = employee.SpouseName;
                    entity.ChildName1 = employee.ChildName1;
                    entity.ChildName2 = employee.ChildName2;
                    entity.PaddressLine1 = employee.PaddressLine1;
                    entity.PaddressLine2 = employee.PaddressLine2;
                    entity.Pcity = employee.Pcity;
                    entity.Pstate = employee.Pstate;
                    entity.Ppincode = employee.Ppincode;
                    entity.IsSameAddress = employee.IsSameAddress;
                    entity.CaddressLine1 = employee.CaddressLine1;
                    entity.CaddressLine2 = employee.CaddressLine2;
                    entity.Ccity = employee.Ccity;
                    entity.Cpstate = employee.Cpstate;
                    entity.Cpincode = employee.Cpincode.Trim();
                    entity.JoiningDate = employee.JoiningDate;
                    entity.Division = employee.Division;
                    entity.Department = employee.Department;
                    entity.EmployeeStatus = employee.EmployeeStatus;
                    entity.EmergencyNo = employee.EmergencyNo;
                    entity.UpdatedAt = DateTime.Now;
                    
                    _AtdmsWebContext.EmployeeDetails.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    UserRoleMappingDetail umap = GetUserRole(employee.UserId);

                    umap.UserId = employee.UserId;
                    umap.RoleId = employee.RoleId;
                   
                    _AtdmsWebContext.UserRoleMappingDetails.Update(umap);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
          
        }

        public IEnumerable<EmployeeDetail> GetNewlyJoinEmployee(DateTime fromDate, DateTime toDate)
        {
            var data = _AtdmsWebContext.EmployeeDetails.Where(x => x.JoiningDate >= fromDate && x.JoiningDate <= toDate).ToList();
            return data;
        }
    }
}
