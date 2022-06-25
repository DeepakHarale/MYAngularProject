using ATDMS.BussinessLogic.EfModeles;
using ATDMS.BussinessLogic.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using ATDMS.BussinessLogic.Models;
using System.Threading.Tasks;

namespace ATDMS.BussinessLogic.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public EmployeeRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public IEnumerable<DocumentDetailsDTO> GetDocument()
        {
            var data = (from doc in _AtdmsWebContext.DocumentDetails
                        join docType in _AtdmsWebContext.DocumentType on doc.DocumentTypeId equals docType.DocumentId
                        select new DocumentDetailsDTO()
                        {
                            document = doc,
                            documentType = docType
                        }).ToList();
            return data;
        }


        public IEnumerable<DocumentType> GetDocumentType()
        {
            return _AtdmsWebContext.DocumentType.ToList();
        }

        public IEnumerable<EmployeeDetails> GetEmployee()
        {
            return _AtdmsWebContext.EmployeeDetails.ToList();
        }
        public async Task<IEnumerable<DocumentDetailsDTO>> GetDocumentByEmployee(int employeeId)
        {
            var data = await (from doc in _AtdmsWebContext.DocumentDetails.Where(x => x.EmployeeId.Equals(employeeId))
                              join docType in _AtdmsWebContext.DocumentType on doc.DocumentTypeId equals docType.DocumentId
                              select new DocumentDetailsDTO()
                              {
                                  document = doc,
                                  documentType = docType
                              }).ToAsyncEnumerable().ToList();
            return data;
        }

        public async Task<DocumentDetails> AddEmployeeDocument(DocumentDetails document)
        {
            await _AtdmsWebContext.DocumentDetails.AddAsync(document);
            await _AtdmsWebContext.SaveChangesAsync();
            return document;
        }
        public bool DeleteDocumentDetails(DocumentDetails document)
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


        public EmployeeDTO GetEmployeeById(int employeeId)
        {
            var data = _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeId.Equals(employeeId)).FirstOrDefault();
            var data1 = (from doc in _AtdmsWebContext.DocumentDetails.Where(x => x.EmployeeId.Equals(employeeId))
                         join docType in _AtdmsWebContext.DocumentType on doc.DocumentTypeId equals docType.DocumentId
                         select new DocumentDetailsDTO()
                         {
                             document = doc,
                             documentType = docType
                         }).ToList();

            var emp = new EmployeeDTO() { employee = data, documentsList = data1 };
            return emp;

        }

        public bool UpdateEmployeeDetails(EmployeeDetails employee)
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
                    entity.Cpincode = employee.Cpincode;
                    entity.JoiningDate = employee.JoiningDate;
                    entity.Division = employee.Division;
                    entity.Department = employee.Department;
                    entity.EmployeeStatus = employee.EmployeeStatus;
                    entity.UpdatedAt = DateTime.Now;
                    _AtdmsWebContext.EmployeeDetails.Update(entity);
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


    }
}
