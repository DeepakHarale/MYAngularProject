using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IAccessoriesStorageRepository
    {
        IEnumerable<AccessoriesStorage> GetAccessoriesStorages();

        IEnumerable<Accessory> GetAccessories();

        int GetAccessoriesStoragecount(int AccessoriesStorageId);

        Task<AccessoriesStorage> AddAccessoriesStorage(AccessoriesStorage accessoriesStorage);

        Task<Accessory> AddAccessories(Accessory accessory);
        bool UpdateAccessoriesStorage(AccessoriesStorage accessoriesStorage);

        bool UpdateAccessories(Accessory accessory);
        bool DeleteAccessoriesStorage(int AccessoriesStorageId);

        bool DeleteAccessories(int AccessoriesId);
    }
}
