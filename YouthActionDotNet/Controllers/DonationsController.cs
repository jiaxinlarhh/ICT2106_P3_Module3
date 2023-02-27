using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Control;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Controllers{

    [Route("api/[controller]")]
    [ApiController]
    public class DonationsController : ControllerBase, IUserInterfaceCRUD<Donations>
    {
        // Private Instance
        private DonationsControl donationsControl;

         JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };


        // Constructor
        public DonationsController(DBContext context)
        {
            donationsControl = new DonationsControl(context);
        }

        [HttpGet("GetByDonorId/{id}")]
        public async Task<ActionResult<string>> GetByDonorId(string id)
        {
            Console.WriteLine("GetByDonorId");
            Console.WriteLine(id);
            return await donationsControl.GetByDonorId(id);
        }

        // Retrieve all donations
        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            return await donationsControl.All();
        }

        // Create a new donation
        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Donations template)
        {
            return await donationsControl.Create(template);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await donationsControl.Delete(id);
        }

        // Delete a donation based on the donation object
        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(Donations template)
        {
            return await donationsControl.Delete(template);
        }

        // Check if donation exists
        public bool Exists(string id)
        {
            return donationsControl.Exists(id);
        }

        // Retrieves a donation with a specific ID from the database
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {
            return await donationsControl.Get(id);
        }

        // Retrieves settings for the donation
        [HttpGet("Settings")]
        public string Settings()
        {
            return donationsControl.Settings();
        }

        // Updates a donation with a specific ID in the database
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Donations template)
        {
            return await donationsControl.Update(id,template);
        }
        
        // Updates a donation with a specific ID in the database and fetches all updated records
        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Donations template)
        {
            return await donationsControl.UpdateAndFetchAll(id,template);
        }
    }
}