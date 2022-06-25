using ATDMS_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Services
{
    public interface IMailService
    {
        Task SendEMailAsync(MailRequest mailRequest);
    }
}
