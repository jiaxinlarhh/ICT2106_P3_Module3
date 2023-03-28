using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;
using Newtonsoft.Json;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Controllers;

namespace YouthActionDotNet.Control
{
    public class DonorDashboardControl : IDonationDetails , IProject
    {
        private DonationsRepoIn donationsRepoIn;
        private DonationsRepoOut donationsRepoOut;
        private GenericRepositoryOut<Project> projectRepositoryOut;
      
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public DonorDashboardControl(DBContext context)
        {
            donationsRepoIn = new DonationsRepoIn(context);
            donationsRepoOut = new DonationsRepoOut(context);
            projectRepositoryOut = new GenericRepositoryOut<Project>(context);
           
        }

         public async Task<ActionResult<string>> GetDonationByID(string id)
        {
            var donations = await donationsRepoOut.GetByIDAsync(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        /** Get all donations by donor id **/
        public async Task<ActionResult<string>> GetByDonorId(string id)
        {
            var donations = await donationsRepoOut.GetByDonorId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        /** Get all donations by project id **/

        public async Task<ActionResult<string>> GetByProjectId(string id)
        {
            var donations = await donationsRepoOut.GetByProjectId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        /** Get all donations **/
        public async Task<ActionResult<string>> GetAll()
        {
            var donations = await donationsRepoOut.GetAll();
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        /** Get all projects **/
        public async Task<ActionResult<string>> GetAllProjects()
        {
            var projects = await projectRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Projects Successfully Retrieved" });
        }

 
    }
}