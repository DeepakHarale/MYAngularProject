using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
  public  interface IInterviewDetailsRepository
    {
        IEnumerable<InterviewDetail> GetInterviewDetails();
        Task<InterviewDetail> AddInterviewDetails(InterviewDetail detail);
        bool DeletenterviewDetail(InterviewDetail deleteDetails);
        bool UpdateInterviewDetail(InterviewDetail detail);

    }
}
