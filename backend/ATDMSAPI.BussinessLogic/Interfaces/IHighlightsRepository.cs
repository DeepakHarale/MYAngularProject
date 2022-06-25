using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IHighlightsRepository
    {
        IEnumerable<Highlight> GetHighlight();


        Task<Highlight> AddHighlight(Highlight highlight);


        bool UpdateHighlight(Highlight highlight);


        bool DeleteHighlight(int HighlightsId);



    }
}
