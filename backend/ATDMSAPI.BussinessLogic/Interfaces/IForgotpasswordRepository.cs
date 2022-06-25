using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IForgotpasswordRepository
    {
        Task<bool> GetForgotPassword(string UserName);
        int GetVerifyCode(string code);
        string ResetPassword(ResetPasswordDTO resetPassword);

    }
}
