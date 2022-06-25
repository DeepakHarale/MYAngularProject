using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IEmployeeRepository
    {     
        IEnumerable<EmployeeListDTO> GetEmployee();

        IEnumerable<EmployeeDetail> GetNewlyJoinEmployee(DateTime fromDate, DateTime toDate);
        IEnumerable<DocumentType> GetDocumentType();
        IEnumerable<DocumentDetailsDTO> GetDocument();
        Task<IEnumerable<DocumentDetailsDTO>> GetDocumentByEmployee(int employeeId);
        Task<DocumentDetail> AddEmployeeDocument(DocumentDetail document);

        bool UpdateDocumentDetail(DocumentDetail docDetail);
        bool DeleteDocumentDetails(DocumentDetail document);
        EmployeeRoleDocDTO GetEmployeeById(int employeeId);
        bool UpdateEmployeeDetails(EmployeeListDTO employee);
       // bool UpdateDocumentDetail(DocumentDetail docDetail);
    }
}
