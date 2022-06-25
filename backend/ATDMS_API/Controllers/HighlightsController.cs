using ATDMS_API.Models;
using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ATDMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighlightsController : ControllerBase
    {
        private readonly IHighlightsRepository _highlightsRepository;
        public HighlightsController(IHighlightsRepository highlightsRepository)
        {
            _highlightsRepository = highlightsRepository;
        }

        [HttpGet("GetHighlight")]
        public IEnumerable<Highlight> GetHighlight()
        {
            return _highlightsRepository.GetHighlight();
        }

        [HttpPost("AddHighlight")]
        public async Task<IActionResult> AddHighlights([FromForm] HighlightsModel body)
        {
            if (body == null || body.File.Length == 0)
                return Ok(false);
            string guid = Guid.NewGuid().ToString();
            string fileExtension = body.File.FileName.Split(".").Last();
            string photo = "highlight";
            string fileName = guid + "." + fileExtension;
            string localPath = $"Resources/{photo}";
            if (!Directory.Exists(Path.Combine(
                      Directory.GetCurrentDirectory(), localPath)))
            {
                Directory.CreateDirectory(Path.Combine(
                       Directory.GetCurrentDirectory(), localPath));
            }
            var path = Path.Combine(
                     Directory.GetCurrentDirectory(), localPath,
                     fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await body.File.CopyToAsync(stream);
            }
            var pathDB = $"{localPath}/{fileName}";
            body.highlights.HighlightsPath = pathDB;
            //body.document.UpdatedAt = DateTime.Now;
            //body.document.CreatedAt = DateTime.Now;
            var res = await _highlightsRepository.AddHighlight(body.highlights);
            return Ok(res);
            
        }

        [HttpPut("UpdateHighlights")]
        public async Task<bool> UpdateHighlight([FromForm] HighlightsModel body)
        {
            //return _highlightsRepository.UpdateHighlight(highlight);

           
            if (body == null || body.File.Length == 0)
                return false;
            string guid = Guid.NewGuid().ToString();
            string fileExtension = body.File.FileName.Split(".").Last();
            string photo = "highlight";
            string fileName = guid + "." + fileExtension;
            string localPath = $"Resources/{photo}";
            if (!Directory.Exists(Path.Combine(
                      Directory.GetCurrentDirectory(), localPath)))
            {
                Directory.CreateDirectory(Path.Combine(
                       Directory.GetCurrentDirectory(), localPath));
            }
            var path = Path.Combine(
                     Directory.GetCurrentDirectory(), localPath,
                     fileName);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await body.File.CopyToAsync(stream);
            }
            var pathDB = $"{localPath}/{fileName}";
            body.highlights.HighlightsPath = pathDB;
            //body.document.UpdatedAt = DateTime.Now;
            //body.document.CreatedAt = DateTime.Now;
            var res =  _highlightsRepository.UpdateHighlight(body.highlights);
            
            return res;

        }

        [HttpPost("DeleteHighlights")]
        public bool DeleteHighlight([FromBody] Highlight highlight)
        {
            //var res =_highlightsRepository.DeleteHighlight(HighlightsId);

            //return res;
            var res = _highlightsRepository.DeleteHighlight(highlight.HighlightsId);
            string projectPath = Directory.GetCurrentDirectory();
            if (System.IO.File.Exists(Path.Combine(
                    projectPath, highlight.HighlightsPath)))
            {
                System.IO.File.Delete(Path.Combine(projectPath, highlight.HighlightsPath));
                return res;
            }
            return res;
        }
    }
}
