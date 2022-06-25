using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using ATDMSAPI.BussinessLogic.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.IO;


namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class EmployeeProfilePhoto:EmployeeRepository,IEmployeeProfilePhoto
    {
        private readonly AtdmsWebContext _AtdmsWebContext;
        public EmployeeProfilePhoto(AtdmsWebContext AtdmsWebContext) : base(AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public  EmployeePhotoUrlDTO GetProfilePhotoUrl(int employeeId)
        {          
            var data = (from emp in _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeId.Equals(employeeId))                       
                        select new EmployeePhotoUrlDTO()
                        {
                            EmployeeId = employeeId,
                            ProfilePhotoPath = emp.ProfilePhotoPath
                        }).FirstOrDefault();
            return data;
            
        }

        public bool UploadProfilePhotoUrl(int employeeId,string url)
        {
            int cnt = 0;
            bool result = false;
            var emp = _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeId.Equals(employeeId)).FirstOrDefault();
            if (emp != null)
            {
                emp.ProfilePhotoPath = url; 
                _AtdmsWebContext.EmployeeDetails.Update(emp);
            }
            cnt= _AtdmsWebContext.SaveChanges();
            if (cnt > 0)
                result = true;
            return result;
        }
    }
}
