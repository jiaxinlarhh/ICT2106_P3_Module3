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
using System.Text.Json;

namespace YouthActionDotNet.Controllers{

    [Route("api/[controller]")]
    [ApiController]
    public class DonationsController : ControllerBase //, IUserInterfaceCRUD<Donations>
    {
        // Private Instance
        private DonationsControl donationsControl;
        private ICurrency _currencyConverter;

         JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };


        // Constructor
        public DonationsController(DBContext context)
        {
           var apiKey = "aG3kk6LNE5obzTL94EiMLD8V7M0HOsyN";
        var currencyConverter = new CurrencyConverterAdapter(apiKey);
        donationsControl = new DonationsControl(context, currencyConverter);
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
        // [HttpPost("Create")]
        // public async Task<ActionResult<string>> Create(Donations template)
        // {
        //     var data =  await donationsControl.Create(template);

        //     //pass the data to the view model
        //     DonationViewModel donationViewModel = new DonationViewModel();
        //     donationViewModel.JSONObject = data;

        //     //pass the view model to the view
        //     return donationViewModel.JSONObject;
        // }

        // Create a new donation
        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(JsonElement donationJson)
        {

            try {
                var donationType = donationJson.GetProperty("DonationType").GetString();
                Donations donation;
                if (donationType == "Monetary") {
                    donation = System.Text.Json.JsonSerializer.Deserialize<MonetaryDonations>(donationJson.GetRawText());
                }
                else if (donationType == "Item") {
                    donation = System.Text.Json.JsonSerializer.Deserialize<ItemDonations>(donationJson.GetRawText());
                }
                else {
                    return BadRequest($"Invalid donation type: {donationType}");
                }

                var data =  await donationsControl.Create(donation);

                //pass the data to the view model
                DonationViewModel donationViewModel = new DonationViewModel();
                donationViewModel.JSONObject = data;

                //pass the view model to the view
                return donationViewModel.JSONObject;
            }
            catch (Exception ex) {
                return BadRequest($"Error creating donation: {ex.Message}");
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await donationsControl.Delete(id);
        }

        // Delete a donation based on the donation object
        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(JsonElement donationJson)
        {
            try {
                var donationsId = donationJson.GetProperty("DonationsId").GetString();
                var data =  await donationsControl.Delete(donationsId);

                //pass the data to the view model
                DonationViewModel donationViewModel = new DonationViewModel();
                donationViewModel.JSONObject = data;

                //pass the view model to the view
                return donationViewModel.JSONObject;
            }
            catch (Exception ex) {
                return BadRequest($"Error creating donation: {ex.Message}");
            }
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

        [HttpPost("All")]
        public async Task<ActionResult<string>> All([FromBody] SearchRequest request)
        {
            List<Tag> tags = request.data;
            int page = request.pageData.page;
            int pageSize = request.pageData.pageSize;
            
            return await donationsControl.AllInPages(tags, null, page, pageSize);
        }

        // Retrieves settings for the donation
        [HttpGet("Settings")]
        public string Settings()
        {
            return donationsControl.Settings();
        }

        // Updates a donation with a specific ID in the database
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, JsonElement donationJson)
        {
            try {
                var donationType = donationJson.GetProperty("DonationType").GetString();
                Donations donation;
                if (donationType == "Monetary") {
                    donation = System.Text.Json.JsonSerializer.Deserialize<MonetaryDonations>(donationJson.GetRawText());
                }
                else if (donationType == "Item") {
                    donation = System.Text.Json.JsonSerializer.Deserialize<ItemDonations>(donationJson.GetRawText());
                }
                else {
                    return BadRequest($"Invalid donation type: {donationType}");
                }

                var data =  await donationsControl.Update(id, donation);
                //pass the data to the view model
                DonationViewModel donationViewModel = new DonationViewModel();
                donationViewModel.JSONObject = data;

            //pass the view model to the view
            return donationViewModel.JSONObject;
            }
            catch (Exception ex) {
                return BadRequest($"Error creating donation: {ex.Message}");
            }
            

            
        }
        
        // Updates a donation with a specific ID in the database and fetches all updated records
        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, JsonElement donationJson)
        {
            try {
                var donationType = donationJson.GetProperty("DonationType").GetString();
                Donations donation;
                if (donationType == "Monetary") {
                    donation = System.Text.Json.JsonSerializer.Deserialize<MonetaryDonations>(donationJson.GetRawText());
                }
                else if (donationType == "Item") {
                    donation = System.Text.Json.JsonSerializer.Deserialize<ItemDonations>(donationJson.GetRawText());
                }
                else {
                    return BadRequest($"Invalid donation type: {donationType}");
                }
                var data =  await donationsControl.UpdateAndFetchAll(id, donation);
                //pass the data to the view model
                DonationViewModel donationViewModel = new DonationViewModel();
                donationViewModel.JSONObject = data;

                //pass the view model to the view
                return donationViewModel.JSONObject;
            }
            catch (Exception ex) {
                return BadRequest($"Error creating donation: {ex.Message}");
            }
        }
    }
}