using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Helpers;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public UserRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public async Task<IEnumerable<UserDetail>> GetDetails()
        {
            var list = await _AtdmsWebContext.UserDetails.ToListAsync();
            return list;
        }

        public async Task<IEnumerable<RoleMaster>> GetRoles()
        {
           return  await _AtdmsWebContext.RoleMasters.ToListAsync();
        }

        public async Task<IEnumerable<UserRoleMappingDetail>> GetUserRole()
        {
            return await _AtdmsWebContext.UserRoleMappingDetails.ToListAsync();
        }

        public  UserRoleMappingDetail GetUserRole(int userId)
        {
            return  _AtdmsWebContext.UserRoleMappingDetails.Where(x=>x.UserId.Equals(userId)).FirstOrDefault();
        }
        public async Task<int> AddUserDetails(AddUserDTO userDTO)
        {
            if (!CheckEmployeeNo(userDTO.EmployeeNo))
            {
                if (!CheckUser(userDTO.EmailId))
                {
                    using (var context = _AtdmsWebContext)
                    {
                        using (var transaction = context.Database.BeginTransaction())
                        {
                            try
                            {
                                userDTO.Password = PwdHelper.Encrypt(userDTO.Password);
                                var user = new UserDetail()
                                {
                                    UserName = userDTO.EmailId,
                                    Password = userDTO.Password,
                                    CreatedAt = DateTime.Now
                                };
                                await context.UserDetails.AddAsync(user);
                                await context.SaveChangesAsync();
                                int? EmployeeId = context.EmployeeDetails.Max(x => (int?)x.EmployeeId);
                                var employee = new EmployeeDetail()
                                {
                                    EmployeeId = EmployeeId.GetValueOrDefault(0) + 1,
                                    UserId = user.UserId,
                                    EmployeeNo = userDTO.EmployeeNo,
                                    EmployeeName = userDTO.EmployeeName,
                                    MobileNo = userDTO.MobileNo,
                                    EmergencyNo=userDTO.EmergencyNo,
                                    EmailId = userDTO.EmailId,
                                    //Update by shubhangee ,for leave calculation :gender,joining date should not be null.
                                    Gender = userDTO.Gender,
                                    JoiningDate = userDTO.JoiningDate,
                                    Division = userDTO.Division,
                                    Department = userDTO.Department,
                                    EmployeeStatus = userDTO.EmployeeStatus,
                                    CreatedAt = DateTime.Now,
                                    UpdatedAt = DateTime.Now,
                                    
                                    
                                };
                                await context.EmployeeDetails.AddAsync(employee);
                                await context.SaveChangesAsync();
                                var userMap = new UserRoleMappingDetail()
                                {
                                    UserId = user.UserId,
                                    RoleId = userDTO.RoleId
                                };
                                await context.UserRoleMappingDetails.AddAsync(userMap);
                                await context.SaveChangesAsync();
                                transaction.Commit();
                                return user.UserId;
                            }
                            catch (Exception ex)
                            {
                                transaction.Rollback();
                                throw ex;
                            }
                        }
                    }
                }
                return -2;
            }
            return -1;
        }
        public bool CheckUser(string userName)
        {
            var check = _AtdmsWebContext.UserDetails.Where(x => x.UserName.ToLower() == userName.ToLower()).ToList();
            return check.Count() != 0;
        }
        public bool CheckEmployeeNo(string EmpNo)
        {
            var check = _AtdmsWebContext.EmployeeDetails.Where(x => x.EmployeeNo.ToLower() == EmpNo.ToLower()).ToList();
            return check.Count() != 0;
        }


        public UserDTO LoginAuth(string userName, string password)
        {
            try
            {
                var data = (from u in _AtdmsWebContext.UserDetails.Where(x => x.UserName.ToLower() == userName.ToLower())
                            join ur in _AtdmsWebContext.UserRoleMappingDetails on u.UserId equals ur.UserId
                            join emp in _AtdmsWebContext.EmployeeDetails on u.UserId equals emp.UserId
                            select new UserDTO()
                            {
                                UserId = u.UserId,
                                RoleId = ur.RoleId,
                                UserName = u.UserName,
                                Password = u.Password,
                                EmployeeId = emp.EmployeeId,
                                EmployeeName = emp.EmployeeName,
                                MobileNo = emp.MobileNo,
                                EmailId = emp.EmailId,
                                ProfilePhotoPath = emp.ProfilePhotoPath,
                                CreatedAt = u.CreatedAt.GetValueOrDefault(DateTime.Now)
                            }).FirstOrDefault();
                if (data != null)
                {
                    var encrypt = PwdHelper.Encrypt(password);
                    var Valid = PwdHelper.passwordVarify(encrypt, data.Password);
                    if (Valid)
                    {
                        data.Password = null;
                        return data;
                    }
                }
                return new UserDTO();

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public UserDTO GetUserById(int UserId)
        {
            try
            {
                var data = (from u in _AtdmsWebContext.UserDetails.Where(x => x.UserId.Equals(UserId))
                            join ur in _AtdmsWebContext.UserRoleMappingDetails on u.UserId equals ur.UserId
                            join emp in _AtdmsWebContext.EmployeeDetails on u.UserId equals emp.UserId
                            select new UserDTO()
                            {
                                UserId = u.UserId,
                                RoleId = ur.RoleId,
                                UserName = u.UserName,
                                Password = null,
                                EmployeeId = emp.EmployeeId,
                                EmployeeName = emp.EmployeeName,
                                MobileNo = emp.MobileNo,
                                EmailId = emp.EmailId,
                                ProfilePhotoPath = emp.ProfilePhotoPath,                              
                                CreatedAt = u.CreatedAt.GetValueOrDefault(DateTime.Now)
                            }).FirstOrDefault();
                if (data != null)
                {
                    return data;
                }
                return new UserDTO();

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public string ChangePassword(ChangePasswordDTO change)
        {
            var user = _AtdmsWebContext.UserDetails.Where(x => x.UserName.ToLower() == change.UserName.ToLower()).FirstOrDefault();
            if (user != null)
            {
                var encrypt = PwdHelper.Encrypt(change.OldPassword);
                var Valid = PwdHelper.passwordVarify(encrypt, user.Password);
                if (Valid)
                {
                    user.Password = PwdHelper.Encrypt(change.NewPassword);
                    _AtdmsWebContext.SaveChanges();
                    return "Password change successfully";
                }
                return "Incorrect old password";
            }
            return "User not found";
        }

    }
}
