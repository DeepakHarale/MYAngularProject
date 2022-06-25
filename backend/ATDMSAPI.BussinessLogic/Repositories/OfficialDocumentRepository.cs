using ATDMSAPI.BussinessLogic.EfModeles;
using ATDMSAPI.BussinessLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATDMSAPI.BussinessLogic.Repositories
{
    public class OfficialDocumentRepository : IOfficialDocumentRepository
    {
        private readonly AtdmsWebContext _AtdmsWebContext;

        public OfficialDocumentRepository(AtdmsWebContext AtdmsWebContext)
        {
            _AtdmsWebContext = AtdmsWebContext;
        }
        public async Task<OfficialDocument> AddOfficialDocument(OfficialDocument officialDocument)
        {
            if (!CheckOfficialDocument(officialDocument))
            {
                var result = await _AtdmsWebContext.OfficialDocuments.AddAsync(officialDocument);
                await _AtdmsWebContext.SaveChangesAsync();
                return result.Entity;

            }
            else
            {
                return officialDocument;
            }
        }


        public bool CheckOfficialDocument(OfficialDocument officialDocument)
        {
            var result = _AtdmsWebContext.OfficialDocuments.Where(x => x.DocumentId.Equals(officialDocument.DocumentId)).ToList();
            return result.Count() != 0;
        }
        public bool DeleteOfficialDocument(int DocumentId)
        {
            try
            {
                OfficialDocument officialDocument = _AtdmsWebContext.OfficialDocuments.FirstOrDefault(x => x.DocumentId.Equals(DocumentId));
                _AtdmsWebContext.OfficialDocuments.Remove(officialDocument);
                _AtdmsWebContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<OfficialDocument> GetOfficialDocuent()
        {
            return _AtdmsWebContext.OfficialDocuments.ToList();
        }

        public bool UpdateOfficialDocument(OfficialDocument officialDocument)
        {
            try
            {
                var entity = _AtdmsWebContext.OfficialDocuments.Where(x => x.DocumentId.Equals(officialDocument.DocumentId)).FirstOrDefault();
                if (entity != null)
                {
                    entity.DocumentId = officialDocument.DocumentId;
                    entity.ReferenceNo = officialDocument.ReferenceNo;
                    entity.DocumentName = officialDocument.DocumentName;
                    entity.EmployeeName = officialDocument.EmployeeName;
                    entity.Designation = officialDocument.Designation;
                    entity.DocumentDate = officialDocument.DocumentDate;
                    entity.Ctc = officialDocument.Ctc;
                    entity.EmailId = officialDocument.EmailId;
                    entity.MobileNo = officialDocument.MobileNo;
                    entity.Status = officialDocument.Status;
                    _AtdmsWebContext.OfficialDocuments.Update(entity);
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
