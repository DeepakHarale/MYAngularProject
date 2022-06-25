using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
     class InterviewDetailsRepository: IInterviewDetailsRepository
    {
        private readonly AtdmsWebContext _interviewDetails;
        public InterviewDetailsRepository(AtdmsWebContext interview)
        {
            _interviewDetails = interview;
        }


       

        public  async Task<InterviewDetail> AddInterviewDetails(InterviewDetail detail)
        {
            var result = await _interviewDetails.InterviewDetails.AddAsync(detail);
            await _interviewDetails.SaveChangesAsync();
            return result.Entity;
        }

   

        public bool DeletenterviewDetail(InterviewDetail deleteDetails)
        {
            try
            {
                _interviewDetails.InterviewDetails.Remove(deleteDetails);
                _interviewDetails.SaveChanges();
                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public IEnumerable<InterviewDetail> GetInterviewDetails()
        {
            return _interviewDetails.InterviewDetails.ToList();

        }

      

        public bool UpdateInterviewDetail(InterviewDetail detail)
        {
            var updateObj = _interviewDetails.InterviewDetails.Where(x => x.CandidateId.Equals(detail.CandidateId)).FirstOrDefault();
            if (updateObj != null)
            {
                updateObj.CandidateName = detail.CandidateName;
                updateObj.Designation = detail.Designation;
                updateObj.Status = detail.Status;
                updateObj.ScheduleDate = detail.ScheduleDate;
                updateObj.RefralName = detail.RefralName;
                updateObj.InterviewerName = detail.InterviewerName;
                updateObj.FeedbackByInterviewer = detail.FeedbackByInterviewer;

                _interviewDetails.InterviewDetails.Update(updateObj);
                _interviewDetails.SaveChanges();
                return true;
            }
            return false;
        }
    }

   
    }
