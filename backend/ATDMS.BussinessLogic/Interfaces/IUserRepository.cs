using ATDMS.BussinessLogic.EfModeles;
using ATDMS.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ATDMS.BussinessLogic.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<RoleMaster>> GetRoles();

        Task<IEnumerable<UserRoleMappingDetails>> GetUserRole();
        Task<IEnumerable<UserDetails>> GetDetails();
        Task<int> AddUserDetails(AddUserDTO userDTO);
        UserDTO LoginAuth(string userName, string password);
        bool CheckUser(string userName);
        string ChangePassword(ChangePasswordDTO change);
        UserDTO GetUserById(int UserId);
    }

}
