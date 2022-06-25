using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IEmployeeProfilePhoto
    {
        public bool UploadProfilePhotoUrl(int employeeId, string url);
    }
}
