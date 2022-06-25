using ATDMSAPI.BussinessLogic.EfModeles;
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
    public class PermissionRepository : ModuleRepository, IPermissions
    {
        private readonly AtdmsWebContext _AtdmsWebContext;
        public PermissionRepository(AtdmsWebContext AtdmsWebContext) : base(AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public async Task<RolePermission> AddPermissions(RolePermission permission)
        {
            if (!ExistingRolePermision(permission))
            {
                var result = await _AtdmsWebContext.RolePermissions.AddAsync(permission);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            return permission;
        }

        public  List<RolePermission> AddModulePermissions(IEnumerable<ModuleAllPermissionDTO> moperDtToAdd, int roleId)
        {

            IEnumerable<PermissionMaster> permissionsDefaultData = GetPermission();
            List<RolePermission> rolePermission = new List<RolePermission>();
            foreach (var mPer in moperDtToAdd)
            {
                IEnumerable<ModulePermissionDTO> PermissionsData = mPer.PermissionList;
                Module ModuleData = mPer.module;
                foreach (var per in PermissionsData)
                {
                    RolePermission rper = new RolePermission();
                    rper.PermissionId = per.PermissionId;
                    rper.ModuleId = per.ModuleId;
                    rper.ApprvedStatus = per.ApprvedStatus;
                    rper.RoleId = roleId;


                    RolePermission checkModPer = _AtdmsWebContext.RolePermissions.Where(x => x.ModuleId.Equals(rper.ModuleId)
                                                           && x.PermissionId.Equals(rper.PermissionId)
                                                            && x.RoleId.Equals(rper.RoleId)
                                                           ).FirstOrDefault();
                    int result = 0;
                    if (checkModPer == null)
                    {
                         _AtdmsWebContext.RolePermissions.Add(rper);
                        result = _AtdmsWebContext.SaveChanges();                       
                    }
                    else
                    {
                        checkModPer.PermissionId = per.PermissionId;
                        checkModPer.ModuleId = per.ModuleId;
                        checkModPer.ApprvedStatus = per.ApprvedStatus;
                        checkModPer.RoleId = roleId;

                        _AtdmsWebContext.RolePermissions.Update(checkModPer);
                        result = _AtdmsWebContext.SaveChanges();
                       
                    }
                    if (result>0)
                    {
                        rolePermission.Add(rper);
                    }
                }
                
            }
            return rolePermission;
        }

        public bool ExistingRolePermision(RolePermission permission)
        {
            var result = _AtdmsWebContext.RolePermissions.Where(x => x.RoleId.Equals(permission.RoleId) &&
                                                                     x.ModuleId.Equals(permission.ModuleId) &&
                                                                     x.PermissionId.Equals(permission.PermissionId)
                                                                     ).ToList(); ;
            return result.Count() > 0 ? true : false;
        }

        public bool DeletePermission(int permissionId)
        {
            RolePermission rolePermission = _AtdmsWebContext.RolePermissions.FirstOrDefault(x => x.RolePermissionId.Equals(permissionId));
            _AtdmsWebContext.RolePermissions.Remove(rolePermission);
            _AtdmsWebContext.SaveChanges();
            return true;
        }

        public IEnumerable<PermissionMaster> GetPermission()
        {
            var data = (_AtdmsWebContext.PermissionMasters.Where(x => x.IsActive.Equals(true))).ToList();

            return data;
        }

        public async Task<IEnumerable<PermissionDTO>> GetModulePermissions(int moduleId)
        {
            var data = await (from rolePermission in _AtdmsWebContext.RolePermissions.Where(x => x.ModuleId.Equals(moduleId))
                              join modules in _AtdmsWebContext.Modules.Where(x => x.ModuleId.Equals(moduleId)) on rolePermission.ModuleId equals modules.ModuleId
                              join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                              join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId
                              select new PermissionDTO()
                              {
                                  Role = role,
                                  module = modules,
                                  permission = permission,
                                  rolepermissions = rolePermission
                              }).ToListAsync();
            return data;
        }

        public IEnumerable<ModuleAllPermissionDTO> GetAllModulePermissions(int roleId)
        {
            IEnumerable<PermissionMaster> PermissionsData = GetPermission();
            IEnumerable<Module> ModuleData = GetAllModule();
            
            List<ModuleAllPermissionDTO> moduleAllPer = new List<ModuleAllPermissionDTO>();

            IEnumerable<PermissionDTO> rolePermissiondata = (from rolePermission in _AtdmsWebContext.RolePermissions.Where(x => x.RoleId.Equals(roleId))
                                                             join modules in _AtdmsWebContext.Modules on rolePermission.ModuleId equals modules.ModuleId
                                                             join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                                                             join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId

                                                             select new PermissionDTO()
                                                             {
                                                                 Role = role,
                                                                 module = modules,
                                                                 permission = permission,
                                                                 rolepermissions = rolePermission
                                                             }).ToList();

            foreach (var module in ModuleData)
            {
                List<ModulePermissionDTO> listofModulePermission = new List<ModulePermissionDTO>();
                ModuleAllPermissionDTO mAllPer = new ModuleAllPermissionDTO();
                //get permission data for module
                var modulePer = (from rP in rolePermissiondata
                                 where rP.module.ModuleId == module.ModuleId
                                 select rP).ToList();
                //check whether module data is there in permission table
                if (modulePer != null)
                {
                    //if module data is present.
                    foreach (var mainper in PermissionsData)
                    {
                        //check whether permission entry is present in addedlist
                        var tper = (from rP in listofModulePermission
                                    where rP.PermissionId == mainper.PermissionId && rP.ModuleId == module.ModuleId
                                    select rP).FirstOrDefault();

                        ModulePermissionDTO newRow = new ModulePermissionDTO();
                        //if new list doesnot contain this permission then only add new permission entry
                        if (tper == null)
                        {
                            //check for which permission is there for that module
                            var tMper = (from mP in modulePer
                                         where mP.rolepermissions.PermissionId == mainper.PermissionId && mP.module.ModuleId == module.ModuleId
                                         select mP).FirstOrDefault();
                            if (tMper != null)
                            {
                                if (tMper.rolepermissions.PermissionId == mainper.PermissionId)
                                {
                                    newRow.ModuleId = tMper.module.ModuleId;
                                    newRow.PermissionId = tMper.permission.PermissionId;
                                    newRow.PermissionName = tMper.permission.PermissionName;
                                    newRow.ApprvedStatus = tMper.rolepermissions.ApprvedStatus;
                                    listofModulePermission.Add(newRow);
                                }
                            }

                            else
                            {
                                newRow.ModuleId = module.ModuleId;
                                newRow.PermissionId = mainper.PermissionId;
                                newRow.PermissionName = mainper.PermissionName;
                                newRow.ApprvedStatus = false;//by default not approved so set to zero
                                listofModulePermission.Add(newRow);
                            }
                            
                        }
                    }
                    mAllPer.module = module;
                    mAllPer.PermissionList = listofModulePermission;
                    moduleAllPer.Add(mAllPer);
                }
                else
                {
                    foreach (var mainper in PermissionsData)
                    {

                        ModulePermissionDTO newRow = new ModulePermissionDTO();

                        //add default entries of permission for this module

                        newRow.ModuleId = module.ModuleId;
                        newRow.PermissionId = mainper.PermissionId;
                        newRow.PermissionName = mainper.PermissionName;
                        newRow.ApprvedStatus = false;//by default not approved so set to zero
                        listofModulePermission.Add(newRow);

                    }
                    mAllPer.module = module;
                    mAllPer.PermissionList = listofModulePermission;
                    moduleAllPer.Add(mAllPer);
                }
            }

            return moduleAllPer;
        } 
       

        public IEnumerable<PermissionDetailsDTO> GetAllModulePermissions1()
        {
            IEnumerable<PermissionMaster> PermissionsData = GetPermission();
            List<ModulePermissionDTO> listofPermission = new List<ModulePermissionDTO>();

            //IEnumerable<PermissionDTO> data =  (from rolePermission in _AtdmsWebContext.RolePermissions
            //                  join modules in _AtdmsWebContext.Modules on rolePermission.ModuleId equals modules.ModuleId
            //                  join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
            //                  join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId 
            IEnumerable<PermissionDTO> data = (from modules  in _AtdmsWebContext.Modules
                                               join rolePermission in _AtdmsWebContext.RolePermissions on modules.ModuleId equals rolePermission.ModuleId
                                               join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                                               join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId
                                               select new PermissionDTO()
                         {
                             Role = role,
                             module = modules,
                             permission = permission,
                             rolepermissions = rolePermission
                         }).ToList();

            foreach (var per in data)
            {
               
                foreach (var mainper in PermissionsData)
                {
                    var tper = (from rP in listofPermission
                                where rP.PermissionId== mainper.PermissionId && rP.ModuleId == per.module.ModuleId
                                select rP).FirstOrDefault();

                    ModulePermissionDTO newRow = new ModulePermissionDTO();
                    if (tper == null)
                    {
                        if (per.rolepermissions.PermissionId == mainper.PermissionId)
                        {
                            newRow.ModuleId = per.module.ModuleId;
                            newRow.PermissionId = per.permission.PermissionId;
                            newRow.PermissionName = per.permission.PermissionName;
                            newRow.ApprvedStatus = per.rolepermissions.ApprvedStatus;
                            listofPermission.Add(newRow);
                        }

                        else
                        {
                            newRow.ModuleId = per.module.ModuleId;
                            newRow.PermissionId = mainper.PermissionId;
                            newRow.PermissionName = mainper.PermissionName;
                            newRow.ApprvedStatus = false;//false
                            listofPermission.Add(newRow);
                        }
                    }
                }
            }

            IEnumerable<PermissionDetailsDTO> PermissionData = (from dt in data
                                                                join lPer in listofPermission on
                                                                new { a = dt.rolepermissions.PermissionId, dt.module.ModuleId } equals new { a = lPer.PermissionId, lPer.ModuleId }
                                                                select new PermissionDetailsDTO()
                                                                {
                                                                    module = dt.module,
                                                                    PermissionList = listofPermission
                                                                }).ToList();

            //IEnumerable<PermissionDetailsDTO> PermissionData = (from dt in _AtdmsWebContext.Modules
            //                                                    join lPer in listofPermission on
            //                                                    dt.ModuleId equals lPer.ModuleId 
            //                                                    select new PermissionDetailsDTO()
            //                                                    {
            //                                                        module = dt,
            //                                                        PermissionList = listofPermission
            //                                                    }).ToList();


            List<ModulePermissionDTO> tryQuery = new List<ModulePermissionDTO>();
             var kktryQuery = (from m in _AtdmsWebContext.Modules
                                                                join p in _AtdmsWebContext.RolePermissions on
                                                               m.ModuleId equals p.ModuleId into modulePer
                                                                
                                                                 orderby m.ModuleId 
                                                               from mp in modulePer.DefaultIfEmpty()
                                                                select new ModulePermissionDTO()
                                                                {
                                                                   ModuleId=m.ModuleId,
                                                                   PermissionId=mp.PermissionId,
                                                                   
                                                                   ApprvedStatus=mp.ApprvedStatus
                                                                   
                                                                });




            return PermissionData;

        }

        public bool getmoduleper()
        {
             
            //1.get module data by giving roleid
            //2.get role permission data by giving role id 
            //3.get permission master data
            //4.foreach loop  for modules
            //5.in for each check whether data is peresent in  role permission table for row module
            //6.if data is avilable then check with permission
            //7. if permission is there then add it in list if not then add default entries of permission
            //8. if data is not present then add row in modulelist also add default permission for this new module
            //9. returm modlule dat with permission

            return false;
        }
        public async Task<IEnumerable<PermissionDTO>> GetPermissionById(int permissionId)
        {
            var data = await(from rolePermission in _AtdmsWebContext.RolePermissions.Where(x => x.RolePermissionId.Equals(permissionId))
                             join modules in _AtdmsWebContext.Modules on rolePermission.ModuleId equals modules.ModuleId
                             join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                             join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId
                             select new PermissionDTO()
                             {
                                 Role = role,
                                 module = modules,
                                 permission = permission,
                                 rolepermissions = rolePermission
                             }).ToListAsync();
            return data;
        }

        public async Task<IEnumerable<PermissionDTO>> GetRoleModules(int roleId)
        {
            var data = await(from rolePermission in _AtdmsWebContext.RolePermissions.Where(x => x.RoleId.Equals(roleId))
                             join modules in _AtdmsWebContext.Modules on rolePermission.ModuleId equals modules.ModuleId
                             join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                             join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId
                             select new PermissionDTO()
                             {
                                 Role = role,
                                 module = modules,
                                 permission = permission,
                                 rolepermissions = rolePermission
                             }).ToListAsync();
            return data;
        }

        public async Task<IEnumerable<PermissionDTO>> GetRolePermission(int roleId)
        {
            var data = await(from rolePermission in _AtdmsWebContext.RolePermissions.Where(x => x.RoleId.Equals(roleId))
                             join modules in _AtdmsWebContext.Modules on rolePermission.ModuleId equals modules.ModuleId
                             join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                             join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId
                             select new PermissionDTO()
                             {
                                 Role = role,
                                 module = modules,
                                 permission = permission,
                                 rolepermissions = rolePermission
                             }).ToListAsync();
            return data;
        }

        public async Task<IEnumerable<PermissionDTO>> GetSubModulePermissions(int ParentmoduleId)
        {
            var data = await(from rolePermission in _AtdmsWebContext.RolePermissions.Where(x => x.ModuleId.Equals(ParentmoduleId))
                             join modules in _AtdmsWebContext.Modules on rolePermission.ModuleId equals modules.ParentModuleId
                             join role in _AtdmsWebContext.RoleMasters on rolePermission.RoleId equals role.RoleId
                             join permission in _AtdmsWebContext.PermissionMasters on rolePermission.PermissionId equals permission.PermissionId
                             select new PermissionDTO()
                             {
                                 Role = role,
                                 module = modules,
                                 permission = permission,
                                 rolepermissions = rolePermission
                             }).ToListAsync();
            return data;
        }

        public bool UpdatePermission(RolePermission permission)
        {
            var entity = _AtdmsWebContext.RolePermissions.Where(x => x.PermissionId.Equals(permission.PermissionId)).FirstOrDefault();
            if (entity != null)
            {
                entity.PermissionId = permission.PermissionId;
                entity.RolePermissionId = permission.RolePermissionId;
                entity.ModuleId = permission.ModuleId;
                entity.ApprvedStatus=permission.ApprvedStatus;  
                entity.PermissionId=permission.PermissionId;
                entity.IsActive= permission.IsActive;

                _AtdmsWebContext.RolePermissions.Update(entity);
                _AtdmsWebContext.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
