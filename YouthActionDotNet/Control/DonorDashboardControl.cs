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
      
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public DonorDashboardControl(DBContext context)
        {
            donationsRepoIn = new DonationsRepoIn(context);
            donationsRepoOut = new DonationsRepoOut(context);
           
        }

        public async Task<ActionResult<string>> GetByDonorId(string id){
            var donations = await donationsRepoOut.GetByDonorId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }
    }
}