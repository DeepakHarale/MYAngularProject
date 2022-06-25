using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class EmpInfoRepository : IEmpInfoRepository
    {
        private AtdmsWebContext _AtdmsWebContext;

        public EmpInfoRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        public async Task<EmpInfo> AddEmpInfo(EmpInfo empInfo)
        {
            if (!CheckEmpInfo(empInfo))
            {

                var result = await _AtdmsWebContext.EmpInfos.AddAsync(empInfo);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            {
                return empInfo;
            }
        }

        public bool CheckEmpInfo(EmpInfo empInfo)
        {
            var result = _AtdmsWebContext.EmpInfos.Where(x => x.EmpInfoId.Equals(empInfo.EmpInfoId)).ToList();
            return result.Count() != 0;
        }

        public bool DeleteEmpInfo(int EmpInfoId)
        {
            try
            {
                EmpInfo empInfo = _AtdmsWebContext.EmpInfos.FirstOrDefault(x => x.EmpInfoId.Equals(EmpInfoId));
                _AtdmsWebContext.EmpInfos.Remove(empInfo);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<EmpInfo> GetEmpInfo()
        {
            return _AtdmsWebContext.EmpInfos.ToList();
        }

        public bool UpdateEmpInfo(EmpInfo empInfo)
        {
            try
            {
                var entity = _AtdmsWebContext.EmpInfos.Where(x => x.EmpInfoId.Equals(empInfo.EmpInfoId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.EmpInfoId = empInfo.EmpInfoId;
                    entity.EmpId = empInfo.EmpId;
                    entity.BloodGroup = empInfo.BloodGroup;
                    entity.Anniversary = empInfo.Anniversary;

                    _AtdmsWebContext.EmpInfos.Update(entity);
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
