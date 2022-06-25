using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class EmployeeSkillSetRepository : IEmployeeSkillSetRepository
    {

        private AtdmsWebContext _AtdmsWebContext;

        public EmployeeSkillSetRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        public async Task<EmployeeSkillSet> AddEmployeeSkillSet(EmployeeSkillSet employeeSkillSet)
        {
            if (!CheckEmployeeSkillSet(employeeSkillSet))
            {

                var result = await _AtdmsWebContext.EmployeeSkillSets.AddAsync(employeeSkillSet);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            {
                return employeeSkillSet;
            }

        }

        public bool CheckEmployeeSkillSet(EmployeeSkillSet employeeSkillSet)
        {
            var result = _AtdmsWebContext.EmployeeSkillSets.Where(x => x.SkillId.Equals(employeeSkillSet.SkillId)).ToList();
            return result.Count() != 0;
        }

        public bool DeleteEmployeeSkillSet(int SkillId)
        {
            try
            {
                EmployeeSkillSet employeeSkillSet = _AtdmsWebContext.EmployeeSkillSets.FirstOrDefault(x => x.SkillId.Equals(SkillId));
                _AtdmsWebContext.EmployeeSkillSets.Remove(employeeSkillSet);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<EmployeeSkillSet> GetEmployeeSkillSet()
        {
            return _AtdmsWebContext.EmployeeSkillSets.ToList();
        }

        public bool UpdateEmployeeSkillSet(EmployeeSkillSet employeeSkillSet)
        {
            try
            {
                var entity = _AtdmsWebContext.EmployeeSkillSets.Where(x => x.SkillId.Equals(employeeSkillSet.SkillId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.SkillId = employeeSkillSet.SkillId;
                    entity.SkillDescription = employeeSkillSet.SkillDescription;
                    
                    _AtdmsWebContext.EmployeeSkillSets.Update(entity);
                    _AtdmsWebContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }
    }
}
