using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Controllers;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Control{

    public class DonationsControl: IUserInterfaceCRUD<Donations>
    {
        // Initialize the Generic Repositories
        private GenericRepositoryOut<Donor> DonorRepositoryOut;
        private GenericRepositoryOut<Project> ProjectRepositoryOut;

        private DonationsRepoIn donationsRepoIn;
        private DonationsRepoOut donationsRepoOut;

        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        // Constructor
        public DonationsControl(DBContext context)
        {
            DonorRepositoryOut = new GenericRepositoryOut<Donor>(context);
            ProjectRepositoryOut = new GenericRepositoryOut<Project>(context);

            donationsRepoIn = new DonationsRepoIn(context);
            donationsRepoOut = new DonationsRepoOut(context);
        }

        // Return all Donations by Donor ID
         public async Task<ActionResult<string>> GetByDonorId(string id){
            var donations = await donationsRepoOut.GetByDonorId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        // Return all Donations
        public async Task<ActionResult<string>> All()
        {
            var donations = await donationsRepoOut.GetAllAsync();
            return JsonConvert.SerializeObject(new {success = true, data = donations}, settings);
        }

        // Create a Donations
        public async Task<ActionResult<string>> Create(Donations template)
        {
            await donationsRepoIn.InsertAsync(template);
            var createdDonations = await donationsRepoOut.GetByIDAsync(template.DonationsId);
            return JsonConvert.SerializeObject(new {success = true, data = createdDonations}, settings);
        }

        // Delete a Donations by ID
        public async Task<ActionResult<string>> Delete(string id)
        {
            var donations = await donationsRepoOut.GetByIDAsync(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "Donations Not Found"}, settings);
            }

            await donationsRepoIn.DeleteAsync(donations);
            return JsonConvert.SerializeObject(new {success = true, message = "Donations Successfully Deleted"}, settings);
        }

        // Delete a Donations by object
        public async Task<ActionResult<string>> Delete(Donations template)
        {
            var donations = await donationsRepoOut.GetByIDAsync(template.DonationsId);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "Donations Not Found"}, settings);
            }

            await donationsRepoIn.DeleteAsync(donations);
            return JsonConvert.SerializeObject(new {success = true, message = "Donations Successfully Deleted"}, settings);
        }

        // Check if a Donations exists by ID
        public bool Exists(string id)
        {
            if (donationsRepoOut.GetByIDAsync(id) != null)
            {
                return true;
            }
            return false;
        }

        // Get a Donations by ID
        public async Task<ActionResult<string>> Get(string id)
        {
            var donations = await donationsRepoOut.GetByIDAsync(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "Donations Not Found"}, settings);
            }
            return JsonConvert.SerializeObject(new {success = true, data = donations}, settings);
        }

        // Settings for Donations
        public string Settings()
        {   
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            settings.ColumnSettings.Add("DonationsId", new ColumnHeader{displayHeader = "Donations ID"});
            settings.ColumnSettings.Add("DonationType", new ColumnHeader{displayHeader = "Donation Type"});
            settings.ColumnSettings.Add("DonationAmount", new ColumnHeader{displayHeader = "Donation Amount"});
            settings.ColumnSettings.Add("DonationDate", new ColumnHeader{displayHeader = "Donation Date"});

            settings.FieldSettings.Add("DonationsId", new InputType{type = "text", displayLabel= "Donation ID", editable = false, primaryKey = true});
            settings.FieldSettings.Add("DonationType", new InputType{type = "text", displayLabel= "Donation Type", editable = true, primaryKey = false});
            settings.FieldSettings.Add("DonationAmount", new InputType{type = "number", displayLabel= "Donation Amount", editable = true, primaryKey = false});
            settings.FieldSettings.Add("DonationConstraint", new InputType{type = "text", displayLabel= "Donation Constraint", editable = true, primaryKey = false});
            settings.FieldSettings.Add("DonationDate", new InputType{type = "datetime", displayLabel= "Donation Date", editable = true, primaryKey = false});

            var donors = DonorRepositoryOut.GetAll();
            settings.FieldSettings.Add("DonorId", new DropdownInputType
            {
                type = "dropdown", 
                displayLabel= "Donor", 
                editable = true, 
                primaryKey = false, 
                options = donors.Select(x => new DropdownOption { value = x.UserId, label = x.username}).ToList()
            });

            var projects = ProjectRepositoryOut.GetAll();
            settings.FieldSettings.Add("ProjectId", new DropdownInputType
            {
                type = "dropdown", 
                displayLabel= "Project", 
                editable = true, 
                primaryKey = false, 
                options = projects.Select(x => new DropdownOption { value = x.ProjectId, label = x.ProjectName}).ToList()
            });
            //Todo: Add settings
            return JsonConvert.SerializeObject(new {success = true, data = settings});
        }

        // Update a Donations
        public async Task<ActionResult<string>> Update(string id, Donations template)
        {
            if(id != template.DonationsId)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "Donations ID Mismatch"}, settings);
            }
            await donationsRepoIn.UpdateAsync(template);
            try{
                return await Get(id);
            }catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new {success = false, message = "Donations Not Found"}, settings);
                }
                else
                {
                    throw;
                }
            }
        }

        // Update a Donations and return all
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Donations template)
        {
            if(id != template.DonationsId)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "Donations ID Mismatch"}, settings);
            }
            await donationsRepoIn.UpdateAsync(template);
            try{
                return await All();
            }catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new {success = false, message = "Donations Not Found"}, settings);
                }
                else
                {
                    throw;
                }
            }
        }
    }
}