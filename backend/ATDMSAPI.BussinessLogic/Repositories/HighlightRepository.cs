using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    class HighlightRepository : IHighlightsRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;
        public HighlightRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }


        public IEnumerable<Highlight> GetHighlight()
        {
            return _AtdmsWebContext.Highlights.ToList();
        }
        public async Task<Highlight> AddHighlight(Highlight highlight)
        {
            if (!CheckHightlights(highlight))
            {
                
                var result = await _AtdmsWebContext.Highlights.AddAsync(highlight);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;
            }
            else
            {
                return highlight; 
            }
        }
        public bool CheckHightlights(Highlight highlight)
        {
            var result=_AtdmsWebContext.Highlights.Where(x => x.HighlightsId.Equals(highlight.HighlightsId)).ToList();
            return result.Count() != 0;
        }

        public bool DeleteHighlight(int HighlightsId)
        {
            try
            {
                Highlight highlight = _AtdmsWebContext.Highlights.FirstOrDefault(x => x.HighlightsId.Equals(HighlightsId));
                _AtdmsWebContext.Highlights.Remove(highlight);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }

        }



        public  bool UpdateHighlight(Highlight highlight)
        {
            try
            {
                var entity = _AtdmsWebContext.Highlights.Where(x => x.HighlightsId.Equals(highlight.HighlightsId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.HighlightsId = highlight.HighlightsId;
                    entity.HighlightsPath = highlight.HighlightsPath;
                    entity.HighlightsTitle = highlight.HighlightsTitle;
                    entity.HighlightsDescription = highlight.HighlightsDescription;

                    _AtdmsWebContext.Highlights.Update(entity);
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
