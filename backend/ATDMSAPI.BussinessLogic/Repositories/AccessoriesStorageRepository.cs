using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class AccessoriesStorageRepository : IAccessoriesStorageRepository
    {
        private AtdmsWebContext _AtdmsWebContext;

        public AccessoriesStorageRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }

        public async Task<Accessory> AddAccessories(Accessory accessory)
        {
            if (!CheckAccessory(accessory))
            {

                var result = await _AtdmsWebContext.Accessories.AddAsync(accessory);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            {
                return accessory;
            }

        }

        public bool CheckAccessory(Accessory accessory)
        {
            var result = _AtdmsWebContext.Accessories.Where(x => x.AccessoriesId.Equals(accessory.AccessoriesId)).ToList();
            return result.Count() != 0;
        }


        public async Task<AccessoriesStorage> AddAccessoriesStorage(AccessoriesStorage accessoriesStorage)
        {
            if (!CheckAccessoriesStorage(accessoriesStorage))
            {

                var result = await _AtdmsWebContext.AccessoriesStorages.AddAsync(accessoriesStorage);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            {
                return accessoriesStorage;
            }
        }

        public bool CheckAccessoriesStorage(AccessoriesStorage accessoriesStorage)
        {
            var result = _AtdmsWebContext.AccessoriesStorages.Where(x => x.AccessoriesStorageId.Equals(accessoriesStorage.AccessoriesStorageId)).ToList();
            return result.Count() != 0;
        }

        public bool DeleteAccessories(int AccessoriesId)
        {
            try
            {
                Accessory accessory = _AtdmsWebContext.Accessories.FirstOrDefault(x => x.AccessoriesId.Equals(AccessoriesId));
                _AtdmsWebContext.Accessories.Remove(accessory);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public bool DeleteAccessoriesStorage(int AccessoriesStorageId)
        {
            try
            {
                AccessoriesStorage accessoriesStorage = _AtdmsWebContext.AccessoriesStorages.FirstOrDefault(x =>x.AccessoriesStorageId.Equals(AccessoriesStorageId));
                _AtdmsWebContext.AccessoriesStorages.Remove(accessoriesStorage);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<Accessory> GetAccessories()
        {
            return _AtdmsWebContext.Accessories.ToList();

        }

        public IEnumerable<AccessoriesStorage> GetAccessoriesStorages()
        {
            return _AtdmsWebContext.AccessoriesStorages.ToList();
        }

        public bool UpdateAccessories(Accessory accessory)
        {
            try
            {
                var entity = _AtdmsWebContext.Accessories.Where(x => x.AccessoriesId.Equals(accessory.AccessoriesId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.AccessoriesId = accessory.AccessoriesId;
                    entity.EmployeeId = accessory.EmployeeId;
                    entity.DateOfIssues = accessory.DateOfIssues;
                    entity.DateOfReturn = accessory.DateOfReturn;
                    entity.DamageCharges = accessory.DamageCharges;
                    entity.Quantity = accessory.Quantity;

                    _AtdmsWebContext.Accessories.Update(entity);
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

        public bool UpdateAccessoriesStorage(AccessoriesStorage accessoriesStorage)
        {
            try
            {
                var entity = _AtdmsWebContext.AccessoriesStorages.Where(x => x.AccessoriesStorageId.Equals(accessoriesStorage.AccessoriesStorageId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.AccessoriesStorageId = accessoriesStorage.AccessoriesStorageId;
                    entity.AccessoriesName = accessoriesStorage.AccessoriesName;
                    entity.AccessoriesStorage1 = accessoriesStorage.AccessoriesStorage1;
                    
                    _AtdmsWebContext.AccessoriesStorages.Update(entity);
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

        public int GetAccessoriesStoragecount(int AccessoriesStorageId)
        {
            var data = _AtdmsWebContext.AccessoriesStorages.Where(x => x.AccessoriesStorageId.Equals(AccessoriesStorageId)).FirstOrDefault();
            var list = _AtdmsWebContext.Accessories.Where(c => c.AccessoriesStorageId.Equals(AccessoriesStorageId)).ToList();

            //var sum = _AtdmsWebContext.Accessories.Where(c => c.AccessoriesId.Equals(AccessoriesId)).Sum(e => e.Quantity);

            var total = list.Sum(e => e.Quantity);
            //var result = data.AccessoriesStorage1 - sum.;
            //var result = total.AccessoriesId - data.AccessoriesStorage1;
            var result = total-data.AccessoriesStorageId;
            return (int)result;
        }

        
    }
}
