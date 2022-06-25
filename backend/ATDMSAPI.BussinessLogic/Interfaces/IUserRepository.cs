using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<RoleMaster>> GetRoles();
        Task<IEnumerable<UserRoleMappingDetail>> GetUserRole();
        Task<IEnumerable<UserDetail>> GetDetails();
        Task<int> AddUserDetails(AddUserDTO userDTO);
        UserDTO LoginAuth(string userName, string password);
        bool CheckUser(string userName);
        string ChangePassword(ChangePasswordDTO change);
        UserDTO GetUserById(int UserId);
    }

}
