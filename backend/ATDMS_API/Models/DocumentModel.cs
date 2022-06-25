using ATDMSAPI.BussinessLogic.EfModeles;
using Microsoft.AspNetCore.Http;

namespace ATDMS_API.Models
{
    public class DocumentModel
    {
        public DocumentDetail document { get; set; }
        public IFormFile File { get; set; }
    }
}
