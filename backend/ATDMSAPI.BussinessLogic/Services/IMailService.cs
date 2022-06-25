
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Services
{
    public interface IMailService
    {
        Task SendEMailAsync(MailRequest mailRequest);
    }
}
