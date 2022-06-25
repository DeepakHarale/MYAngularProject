using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
   public  interface IEmpInfoRepository
   {
        IEnumerable<EmpInfo> GetEmpInfo();

        Task<EmpInfo> AddEmpInfo(EmpInfo empInfo);

        bool UpdateEmpInfo(EmpInfo empInfo);

        bool DeleteEmpInfo(int EmpInfoId);

    }
}
