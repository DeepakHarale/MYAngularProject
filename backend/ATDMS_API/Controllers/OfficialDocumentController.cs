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
    public class OfficialDocumentController : ControllerBase
    {
        private readonly IOfficialDocumentRepository _officialDocumentRepository;

        public OfficialDocumentController(IOfficialDocumentRepository officialDocumentRepository)
        {
            _officialDocumentRepository = officialDocumentRepository;
        }

        [HttpGet("GetOfficialDocument")]
        public IEnumerable<OfficialDocument> GetOfficialDocument()
        {
            return _officialDocumentRepository.GetOfficialDocuent();
        }

        [HttpPost("AddOfficialDocument")]
        public async Task<IActionResult> AddOfficialDocument([FromBody] OfficialDocument officialDocument)
        {
            var res = await _officialDocumentRepository.AddOfficialDocument(officialDocument);
            return Ok(res);
        }

        [HttpPost("UpdateOfficialDocument")]

        public bool UpdateOfficialDocument(OfficialDocument officialDocument)
        {
            return _officialDocumentRepository.UpdateOfficialDocument(officialDocument);
        }

        [HttpPost("DeleteOfficialDocument")]

        public bool DeleteOfficialDocument(int DocumentId)
        {
            return _officialDocumentRepository.DeleteOfficialDocument(DocumentId);
        }
    }
}
