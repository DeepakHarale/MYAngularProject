using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Models
{
    class AccessoryDTO
    {
        public Accessory accessory { get; set; }

        public AccessoriesStorage accessoriesStorage { get; set; }
    }
}
