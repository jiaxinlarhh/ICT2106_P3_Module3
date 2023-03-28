using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Controllers;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Control
{
    public class DonationsReportControl : IUserInterfaceCRUD<Report>
    {
        private GenericRepositoryIn<Report> ReportRepositoryIn;
        private ReportRepositoryOut ReportRepositoryOut;
        private GenericRepositoryIn<File> FileRepositoryIn;
        private GenericRepositoryOut<File> FileRepositoryOut;
        private GenericRepositoryOut<Project> ProjectRepositoryOut;
        private DonationsRepoOut DonationsRepositoryOut;

        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };
        public DonationsReportControl(DBContext context)
        {
            ReportRepositoryIn = new GenericRepositoryIn<Report>(context);
            ReportRepositoryOut = new ReportRepositoryOut(context);
            FileRepositoryIn = new GenericRepositoryIn<File>(context);
            FileRepositoryOut = new GenericRepositoryOut<File>(context);
            ProjectRepositoryOut = new GenericRepositoryOut<Project>(context);
            DonationsRepositoryOut = new DonationsRepoOut(context);
        }

        public bool Exists(string id)
        {
            return ReportRepositoryOut.GetByID(id) != null;
        }

        public async Task<ActionResult<string>> Create(Report template)
        {

            var report = await ReportRepositoryIn.InsertAsync(template);
            return JsonConvert.SerializeObject(new { success = true, message = "Report Created", data = report }, settings);
        }

        public async Task<ActionResult<string>> Get(string id)
        {
            var report = await ReportRepositoryOut.GetByIDAsync(id);
            if (report == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Report Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = report, message = "Report Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> Update(string id, Report template)
        {
            if (id != template.ReportId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Report Id Mismatch" });
            }
            await ReportRepositoryIn.UpdateAsync(template);
            try
            {
                return JsonConvert.SerializeObject(new { success = true, data = template, message = "Report Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Report Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Report template)
        {
            if (id != template.ReportId)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Report Id Mismatch" });
            }
            await ReportRepositoryIn.UpdateAsync(template);
            try
            {
                var reports = await ReportRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = reports, message = "Report Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Report Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> Delete(string id)
        {
            var report = await ReportRepositoryOut.GetByIDAsync(id);
            if (report == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Report Not Found" });
            }
            await ReportRepositoryIn.DeleteAsync(id);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Report Successfully Deleted" });
        }

        public async Task<ActionResult<string>> Delete(Report template)
        {
            var report = await ReportRepositoryOut.GetByIDAsync(template.ReportId);
            if (report == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Report Not Found" });
            }
            await ReportRepositoryIn.DeleteAsync(template);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Report Successfully Deleted" });
        }

        public async Task<ActionResult<string>> All()
        {
            var reports = await ReportRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = reports, message = "Reports Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> getDonationsByProjectData(string projectId)
        {
            var data = await ReportRepositoryOut.getDonationsReportData(projectId);
            return JsonConvert.SerializeObject(new { success = true, data = data, message = "Reports Successfully Retrieved" });
        }
        
        public async Task<ActionResult<string>> getDonationsByProjectId(string id)
        {
            var donations = await DonationsRepositoryOut.GetByProjectId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        public string Settings()
        {
            Settings settings = new Settings();
            settings.FieldSettings = new Dictionary<string, InputType>();
            
            var projects = ProjectRepositoryOut.GetAll();
            settings.FieldSettings.Add("ProjectId", new DropdownInputType
            {
                type = "dropdown", 
                displayLabel= "Project", 
                editable = true, 
                primaryKey = false, 
                options = projects.Select(x => new DropdownOption { value = x.ProjectId, label = x.ProjectName}).ToList()
            });

            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Retrieved" });
        }
    }
}
