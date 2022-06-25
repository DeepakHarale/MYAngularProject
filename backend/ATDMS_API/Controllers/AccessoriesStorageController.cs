using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoriesStorageController : ControllerBase
    {
        private readonly IAccessoriesStorageRepository _accessoriesStorageRepository;
        public AccessoriesStorageController(IAccessoriesStorageRepository accessoriesStorageRepository)
        {
            _accessoriesStorageRepository = accessoriesStorageRepository;
        }

        [HttpGet("GetAccessoriesStorage")]
        public IEnumerable<AccessoriesStorage> GetAccessoriesStorage()
        {
            return _accessoriesStorageRepository.GetAccessoriesStorages();
        }

        [HttpPost("AddAccessoriesStorage")]
        public async Task<IActionResult> AddAccessoriesStorage([FromBody] AccessoriesStorage accessoriesStorage)
        {
            var res = await _accessoriesStorageRepository.AddAccessoriesStorage(accessoriesStorage);
            return Ok(res);
        }

        [HttpPost("UpdateAccessoriesStorage")]
        public bool UpdateAccessoriesStorage([FromBody] AccessoriesStorage accessoriesStorage)
        {
            return _accessoriesStorageRepository.UpdateAccessoriesStorage(accessoriesStorage);
        }

        [HttpPost("DeleteAccessoriesStorage")]
        public bool DeleteAccessoriesStorage(int AccessoriesStorageId)
        {
            var res = _accessoriesStorageRepository.DeleteAccessoriesStorage(AccessoriesStorageId);

            return res;
        }


        [HttpGet("GetAccessories")]
        public IEnumerable<Accessory> GetAccessories()
        {
            return _accessoriesStorageRepository.GetAccessories();
        }

        [HttpPost("AddAccessories")]
        public async Task<IActionResult> AddAccessories([FromBody] Accessory accessory)
        {
            var res = await _accessoriesStorageRepository.AddAccessories(accessory);
            return Ok(res);
        }

        [HttpPost("UpdateAccessories")]
        public bool UpdateAccessories([FromBody] Accessory accessory)
        {
            return _accessoriesStorageRepository.UpdateAccessories(accessory);
        }

        [HttpPost("DeleteAccessories")]
        public bool DeleteAccessories(int AccessoriesId)
        {
            var res =_accessoriesStorageRepository.DeleteAccessories(AccessoriesId);

            return res;
        }
        [HttpPost("GetAccessoriesCount")]
        public int GetAccessoriesStoragecount(int AccessoriesStorageId)
        {
            return _accessoriesStorageRepository.GetAccessoriesStoragecount(AccessoriesStorageId);
        }

    }
}

