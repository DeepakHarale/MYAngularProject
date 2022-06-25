﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Setting
{
    public class MailSettings
    {
        public string Mail { get; set; }

        public string DisplayName { get; set; }

        public string Password { get; set; }

        public string Host { get; set; }

        public int Port { get; set; }

        public string UrlPath { get; set; }

        public string ApiName { get; set; }
    }
}
