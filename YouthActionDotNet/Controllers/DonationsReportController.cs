using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Control;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationsReportController : ControllerBase, IUserInterfaceCRUD<Report>
    {
        private DonationsReportControl donationsReportControl;
        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        public DonationsReportController(DBContext context)
        {
            donationsReportControl = new DonationsReportControl(context);
        }

        public bool Exists(string id)
        {
            return donationsReportControl.Get(id) != null;
        }

        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Report template)
        {
            return await donationsReportControl.Create(template);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {
            return await donationsReportControl.Get(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Report template)
        {
            return await donationsReportControl.Update(id, template);
        }

        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Report template)
        {
            return await donationsReportControl.UpdateAndFetchAll(id, template);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await donationsReportControl.Delete(id);
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(Report template)
        {
            return await donationsReportControl.Delete(template);
        }

        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            return await donationsReportControl.All();
        }

        [HttpPost("DonationsReport")]
        public async Task<ActionResult<string>> getDonationsByProjectReport([FromBody] ReportQuery request)
        {
            var donationReportData = await donationsReportControl.getDonationsByProjectData(request.projectId);

            DonationReportViewModel donationReportViewModel = new DonationReportViewModel();
            donationReportViewModel.JSONObject = donationReportData;

            return donationReportViewModel.JSONObject;
        }

        [HttpGet("GetDonationsByProjectId/{id}")]
        public async Task<ActionResult<string>> getDonationsByProjectId(string id)
        {
            return await donationsReportControl.getDonationsByProjectId(id);
        }

        [HttpGet("Settings")]
        public string Settings()
        {
            return donationsReportControl.Settings();
        }
    }
}
