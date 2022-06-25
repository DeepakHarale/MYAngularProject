using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Setting;
using MailKit.Security;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MailKit.Net.Smtp;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using ATDMSAPI.BussinessLogic.Models;
using ATDMSAPI.BussinessLogic.Helpers;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class ForgotPasswordRepository : IForgotpasswordRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;
        private readonly MailSettings _mailSettings;
        
        public ForgotPasswordRepository(AtdmsWebContext AtdmsWebContext,IOptions<MailSettings> options)
        {
            _AtdmsWebContext = AtdmsWebContext;
            _mailSettings = options.Value;
        }

        public async Task<bool> GetForgotPassword(string UserName)
        {
            var data = _AtdmsWebContext.UserDetails.Where(x => x.UserName.Equals(UserName)).FirstOrDefault();
            if (data != null)
            {
                string code = Guid.NewGuid().ToString();
                var entity = _AtdmsWebContext.Forgotpasswords.Where(x => x.UserId.Equals(data.UserId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.Code = code;
                    entity.ExpiryTime = DateTime.Now.AddMinutes(10);
                    _AtdmsWebContext.Forgotpasswords.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                }
                else
                {
                    Forgotpassword forgotpassword = new Forgotpassword()
                    {
                        UserId = data.UserId,
                        Code = code,
                        ExpiryTime = DateTime.Now.AddMinutes(10)
                    };
                    var result = _AtdmsWebContext.Forgotpasswords.Add(forgotpassword);
                    _AtdmsWebContext.SaveChanges();

                }
                string url = _mailSettings.UrlPath + _mailSettings.ApiName + code;

                MailRequest mailRequest = new MailRequest() { 
                Subject="Forgot Password",Body=url ,
                    ToEmail= UserName
                };
                await SendEMailAsync(mailRequest);
                return true;

            }

            return false;
        }

        public int GetVerifyCode(string code)
        {
            try
            {
                var entity = _AtdmsWebContext.Forgotpasswords.Where(x => x.Code.Equals(code)).FirstOrDefault();
                if(entity != null)
                {
                    return entity.UserId.GetValueOrDefault(0);
                }
                else
                {
                    return 0;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public string ResetPassword(ResetPasswordDTO resetPassword)
        {
            var user = _AtdmsWebContext.UserDetails.Where(x => x.UserId == resetPassword.UserId).FirstOrDefault();
            if (user != null)
            {
                    user.Password = PwdHelper.Encrypt(resetPassword.NewPassword);
                    _AtdmsWebContext.SaveChanges();
                    return "Password change successfully"; 
            }
            return "User not found";
        }

        private async Task<bool> SendEMailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            //var builder = new BodyBuilder();           
            //builder.HtmlBody = mailRequest.Body;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = string.Format("<h2 style='color:red;'><a href='{0}'>Reset Password</a></h2>", mailRequest.Body) };
          
        //builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return true;
        }
    }
        
}



