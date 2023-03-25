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
           
            var data = await donorControl.Create(donor);

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;
               
        }

        // Retrieves a donor with a specific ID from the database
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {   
            var data =  await donorControl.Get(id);

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;
        }

        // Updates a donor with a specific ID in the database
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Donor donor)
        {
            var data =  await donorControl.Update(id,donor);

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;
        }

        // Updates a donor with a specific ID in the database and fetches all updated records
        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Donor template)
        {
            var data =  await donorControl.UpdateAndFetchAll(id,template);

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;
        }

        // Deletes a donor with a specific ID from the database
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            var data =  await donorControl.Delete(id);

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;
        }

        // Delets a donor based on the donor object
        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(Donor donor)
        {
            var data =  await donorControl.Delete(donor);

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;
        }

        // Retrieve all donors from the database
        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            var data =  await donorControl.All();          

            //pass the data to the view model
            DonorViewModel donorViewModel = new DonorViewModel();
            donorViewModel.JSONObject = data;

            //pass the view model to the view
            return donorViewModel.JSONObject;              
        }

        [HttpPost("All")]
        public async Task<ActionResult<string>> All([FromBody] SearchRequest request)
        {
            List<Tag> tags = request.data;
            int page = request.pageData.page;
            int pageSize = request.pageData.pageSize;
            
            return await donorControl.AllInPages(tags, null, page, pageSize);
        }

        // Retrieve settings related to the donor
        [HttpGet("Settings")]
        public string Settings()
        {
            return donorControl.Settings();
        }
    }
}

