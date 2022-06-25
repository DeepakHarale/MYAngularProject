using ATDMSAPI.BussinessLogic.EfModeles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Interfaces
{
    public interface IOfficialDocumentRepository
    {
        IEnumerable<OfficialDocument> GetOfficialDocuent();

        Task<OfficialDocument> AddOfficialDocument(OfficialDocument officialDocument);

        bool UpdateOfficialDocument(OfficialDocument officialDocument);

        bool DeleteOfficialDocument(int DocumentId);



    }
}
