using ATDMSAPI.BussinessLogic.EfModeles; 

using Microsoft.AspNetCore.Http;
namespace ATDMS_API.Models
{
    public class ProfilePhotoModel
    {
        public int EmployeeId { get; set; }
        public string ProfilePhotoPath { get; set; }
        public IFormFile File { get; set; }
    }
}
