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
    public class DonorDashboardControl 
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

        /** Get all donations by donor id **/
        public async Task<ActionResult<string>> GetByDonorId(string id){
            var donations = await donationsRepoOut.GetByDonorId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        /** Create Donation **/
        public async Task<ActionResult<string>> CreateDonation(string donorId, string donationType, string donationConstraint, string donationAmount, string projectId){
            var donation = await donationsRepoIn.CreateDonation(donorId, donationType, donationConstraint, donationAmount, projectId);
            if (donation == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donation Not Created" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donation, message = "Donation Successfully Created" });
        }

    }
}