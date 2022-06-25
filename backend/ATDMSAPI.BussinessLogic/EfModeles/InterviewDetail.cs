using System;
using System.Collections.Generic;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class InterviewDetail
    {
        public int CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string Designation { get; set; }
        public string Status { get; set; }
        public DateTime? ScheduleDate { get; set; }
        public string RefralName { get; set; }
        public string InterviewerName { get; set; }
        public string FeedbackByInterviewer { get; set; }
    }
}
