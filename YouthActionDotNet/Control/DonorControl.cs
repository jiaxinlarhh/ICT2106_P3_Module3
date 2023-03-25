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
using YouthActionDotNet.Controllers;

namespace YouthActionDotNet.Control
{    public class DonorControl : IUserInterfaceCRUD<Donor>
    {
        // Initialize the Generic Repositories
        private DonorRepoIn DonorRepositoryIn;
        private DonorRepoOut DonorRepositoryOut;
        JsonSerializerSettings settings = new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        // Constructor
        public DonorControl(DBContext context)
        {
            DonorRepositoryIn = new DonorRepoIn(context);
            DonorRepositoryOut = new DonorRepoOut(context);
        }

        // Check if Donor exists
        public bool Exists(string id)
        {
            return DonorRepositoryOut.GetByID(id) != null;
        }
        
        // Create a Donor
        public async Task<ActionResult<string>> Create(Donor donor)
        {
            var donors = await DonorRepositoryOut.GetAllAsync();
            var existingDonor = donors.FirstOrDefault(d => d.UserId == donor.UserId);
            if(existingDonor != null){
                return JsonConvert.SerializeObject(new { success = false, message = "Donor Already Exists" });
            }
            donor.Password = Utils.hashpassword(donor.Password);
            await DonorRepositoryIn.InsertAsync(donor);
            var createdDonor = await DonorRepositoryOut.GetByIDAsync(donor.UserId);
            return JsonConvert.SerializeObject(new { success = true, data = donor, message = "Donor Successfully Created" });
        }

        // Get a Donor by ID
        public async Task<ActionResult<string>> Get(string id)
        {   
            var donor = await DonorRepositoryOut.GetByIDAsync(id);
            if (donor == null)
            {
                return JsonConvert.SerializeObject(new {success=false,message="Donor Not Found"},settings);
            }
            return JsonConvert.SerializeObject(new {success=true,data=donor},settings);
        }

        //Update a Donor
        public async Task<ActionResult<string>> Update(string id, Donor donor)
        {
            if(id != donor.UserId){
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Donor Id Mismatch" });
            }
            DonorRepositoryIn.Update(donor);
            try{
                return await Get(id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Donor Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        // Update a Donor and return all Donors
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Donor template)
        {
            if(id != template.UserId){
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Donor Id Mismatch" });
            }
            await DonorRepositoryIn.UpdateAsync(template);
            try
            {
                var employees = await DonorRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = employees, message = "Donor Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Donor Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        // Delete a Donor by ID
        public async Task<ActionResult<string>> Delete(string id)
        {
            var donor = await DonorRepositoryOut.GetByIDAsync(id);
            if (donor == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Donor Not Found" });
            }
            
            await DonorRepositoryIn.DeleteAsync(donor);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Donor Successfully Deleted" });
        }

        // Delete a donor by object
        public async Task<ActionResult<string>> Delete(Donor donor)
        {
            var existingDonor = await DonorRepositoryOut.GetByIDAsync(donor.UserId);
            if (existingDonor == null)
            {
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Donor Not Found" });
            }
            await DonorRepositoryIn.DeleteAsync(existingDonor);
            return JsonConvert.SerializeObject(new { success = true, data = "", message = "Donor Successfully Deleted" });
        }

        // Get all Donors
        public async Task<ActionResult<string>> All()
        {
            var donors = await DonorRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = donors }, settings);
        }

        public async Task<ActionResult<string>> AllInPages(List<Tag> filter, Func<IQueryable<Donor>, IOrderedQueryable<Donor>> orderBy, int page, int pageSize)
        {
            var projects = await DonorRepositoryOut.GetAllInPagesAsync(
                filter : filter, 
                orderBy: orderBy, 
                includeProperties: "",
                page, 
                pageSize);

            return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Donors Successfully Retrieved" });
        }

        // Settings for Donor
        public string Settings()
        {
            Settings settings = new UserSettings();
            settings.ColumnSettings.Add("UserId", new ColumnHeader { displayHeader = "User Id" });
            settings.ColumnSettings.Add("donorName", new ColumnHeader { displayHeader = "Donor Name" });
            settings.ColumnSettings.Add("username", new ColumnHeader { displayHeader = "Username" });
            settings.ColumnSettings.Add("Email", new ColumnHeader { displayHeader = "Email" });
            settings.ColumnSettings.Add("Password", new ColumnHeader { displayHeader = "Password" });
            // settings.ColumnSettings.Add("Role", new ColumnHeader { displayHeader = "Role" });
            settings.ColumnSettings.Add("donorType", new ColumnHeader { displayHeader = "Donor Type" });

            settings.FieldSettings.Add("donorName", new InputType { type = "text", displayLabel = "Donor Name", editable = true, primaryKey = false });
            settings.FieldSettings.Add("donorType", new DropdownInputType { type = "dropdown", displayLabel = "Donor Type", editable = true, primaryKey = false, options = new List<DropdownOption> {
                new DropdownOption { value = "Individual", label = "Individual" },
                new DropdownOption { value = "Organization", label = "Organization" },
            } });
            return JsonConvert.SerializeObject(new {success=true,message="Settings Fetched", data = settings});

        }
    }
}

