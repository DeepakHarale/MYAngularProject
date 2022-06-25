using ATDMS.BussinessLogic.EfModeles;
using ATDMS.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ATDMS.BussinessLogic.Interfaces
{
    public interface IEmployeeRepository
    {     
        IEnumerable<EmployeeDetails> GetEmployee();
        IEnumerable<DocumentType> GetDocumentType();
        IEnumerable<DocumentDetailsDTO> GetDocument();
        Task<IEnumerable<DocumentDetailsDTO>> GetDocumentByEmployee(int employeeId);
        Task<DocumentDetails> AddEmployeeDocument(DocumentDetails document);
        bool DeleteDocumentDetails(DocumentDetails document);
        EmployeeDTO GetEmployeeById(int employeeId);
        bool UpdateEmployeeDetails(EmployeeDetails employee);
    }
}
