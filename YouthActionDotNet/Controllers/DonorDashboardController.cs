using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;
using Newtonsoft.Json;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Control;
using System.Diagnostics;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorDashboardController : ControllerBase
    {
        private DonorDashboardControl donorDashboardControl;
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public DonorDashboardController(DBContext context)
        {
            donorDashboardControl = new DonorDashboardControl(context);
        }


        /** Get all donations by donor id **/
        [HttpGet("GetByDonorId/{id}")]
        public async Task<ActionResult<string>> GetByDonorId(string id)
        {
            Console.WriteLine("GetByDonorId");
            Console.WriteLine(id);
            return await donorDashboardControl.GetByDonorId(id);
        }
       
}
}