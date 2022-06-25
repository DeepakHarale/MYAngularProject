using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Helpers;
using ATDMSAPI.BussinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public RoleRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        public async Task<RoleMaster> AddRole(RoleMaster role)
        {
            //If Data is present in DB avoid duplicate entry.
            if (!CheckRoleDetails(role))
            {
                role.IsActive = true;
                var result = await _AtdmsWebContext.RoleMasters.AddAsync(role);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            return role;
        }

        public bool CheckRoleDetails(RoleMaster role)
        {
            var check = _AtdmsWebContext.RoleMasters.Where(x => x.RoleName.Equals(role.RoleName) ).ToList();

            return check.Count() != 0;
        }
        public bool DeleteRole(int roleId)
        {
            RoleMaster role = _AtdmsWebContext.RoleMasters.FirstOrDefault(x => x.RoleId.Equals(roleId));
            if (role != null)
            {
                _AtdmsWebContext.RoleMasters.Remove(role);
                _AtdmsWebContext.SaveChanges();
            }
            return true;

        }

        public IEnumerable<RoleMaster> GetRole(int roleId)
        {
            var role = _AtdmsWebContext.RoleMasters.Where(x => x.RoleId.Equals(roleId) && x.IsActive.Equals(true));
            
            return role.ToList();
        }

        public IEnumerable<RoleMaster> GetRoles()
        {
            var data = _AtdmsWebContext.RoleMasters.Where(x => x.IsActive.Equals(true)).ToList();

            return data;
        }
         
        public bool UpdateRole(RoleMaster role)
        {
            var entity = _AtdmsWebContext.RoleMasters.Where(x => x.RoleId.Equals(role.RoleId)).FirstOrDefault();
            if (entity != null)
            {              
                entity.RoleName = role.RoleName;
                entity.IsActive = role.IsActive;
                entity.AddedBy= role.AddedBy;
                _AtdmsWebContext.RoleMasters.Update(entity);
                _AtdmsWebContext.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
