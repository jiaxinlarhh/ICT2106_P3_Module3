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
using System.Security.Cryptography;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Control;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase,IUserInterfaceCRUD<Donor>
    {
        // Private Instance
        private DonorControl donorControl;

        // Used to ignore circular references
        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        // Constructor
        public DonorController(DBContext context)
        {
            donorControl = new DonorControl(context);
        }

        // Check if donor exists
        public bool Exists(string id)
        {
            return donorControl.Get(id) != null;
        }
        
        // Create a new donor
        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Donor donor)
        {
            return await donorControl.Create(donor);    
        }

        // Retrieves a donor with a specific ID from the database
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {   
            return await donorControl.Get(id);
        }

        // Updates a donor with a specific ID in the database
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Donor donor)
        {
            return await donorControl.Update(id,donor);
        }

        // Updates a donor with a specific ID in the database and fetches all updated records
        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Donor template)
        {
            return await donorControl.UpdateAndFetchAll(id,template);
        }

        // Deletes a donor with a specific ID from the database
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await donorControl.Delete(id);
        }

        // Delets a donor based on the donor object
        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(Donor donor)
        {
            return await donorControl.Delete(donor);
        }

        // Retrieve all donors from the database
        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            return await donorControl.All();                        
        }

        // Retrieve settings related to the donor
        [HttpGet("Settings")]
        public string Settings()
        {
            return donorControl.Settings();
        }
    }
}

