using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IRoleRepository
    {
        IEnumerable<RoleMaster> GetRoles();

        IEnumerable<RoleMaster> GetRole(int roleId);

        Task<RoleMaster> AddRole(RoleMaster role);

        bool UpdateRole(RoleMaster role);

        bool DeleteRole(int roleId);       
    }
}   
