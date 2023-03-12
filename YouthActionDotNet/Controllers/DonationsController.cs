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
            
            var data =  await donationsControl.GetByDonorId(id);

            //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
        }

        // Retrieve all donations
        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            var data =  await donationsControl.All();
            //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
        }

        // Create a new donation
        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Donations template)
        {
            var data =  await donationsControl.Create(template);

            //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
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
            var data =  await donationsControl.Delete(template);

            //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
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
            var data =  await donationsControl.Get(id);
            //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
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
            var data =  await donationsControl.Update(id,template);
            //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
        }
        
        // Updates a donation with a specific ID in the database and fetches all updated records
        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Donations template)
        {
            var data =  await donationsControl.UpdateAndFetchAll(id,template);
              //pass the data to the view model
            DonationViewModel donationViewModel = new DonationViewModel();
            donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
        }
    }
}