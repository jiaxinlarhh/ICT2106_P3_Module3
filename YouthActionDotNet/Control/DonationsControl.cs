using System;
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

    public class DonationsControl: IUserInterfaceCRUD<Donations> , IDonationDetails
    {
        // Initialize the Generic Repositories
        private DonorRepoOut DonorRepositoryOut;
        private GenericRepositoryOut<Project> ProjectRepositoryOut;

        private DonationsRepoIn donationsRepoIn;
        private DonationsRepoOut donationsRepoOut;

        private readonly ICurrency _currencyConverter;

        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };
        private DBContext context;

        // Constructor
        public DonationsControl(DBContext context, ICurrency currencyConverter)
        {
            DonorRepositoryOut = new DonorRepoOut(context);
            ProjectRepositoryOut = new GenericRepositoryOut<Project>(context);
            donationsRepoIn = new DonationsRepoIn(context);
            donationsRepoOut = new DonationsRepoOut(context);
            _currencyConverter = currencyConverter;
        }

        // -------For Interface IDonation----------------

        // Return all Donations by Donor ID

         public async Task<ActionResult<string>> GetDonationByID(string id){

            var donations = donationsRepoOut.GetByIDAsync(id);
              if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });

          


         }
        public async Task<ActionResult<string>> GetByDonorId(string id){
            var donations = await donationsRepoOut.GetByDonorId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        // Return all Donations by Project ID
        public async Task<ActionResult<string>> GetByProjectId(string id){
            var donations = await donationsRepoOut.GetByProjectId(id);
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }

        // Return All Donations
        public async Task<ActionResult<string>> GetAll(){
            var donations = await donationsRepoOut.GetAll();
            if (donations == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Donations Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = donations, message = "Donations Successfully Retrieved" });
        }



        public async Task<ActionResult<string>> AllInPages(List<Tag> filter, Func<IQueryable<Donations>, IOrderedQueryable<Donations>> orderBy, int page, int pageSize)
        {
            var projects = await donationsRepoOut.GetAllInPagesAsync(
                filter : filter, 
                orderBy: orderBy, 
                includeProperties: "",
                page, 
                pageSize);

            return JsonConvert.SerializeObject(new { success = true, data = projects, message = "Expenses Successfully Retrieved" });
        }

        //-------------------------------------------------------------
        
        // Currency Converter
        // public async Task<MonetaryDonations> convertCurrency(Donations template) {
        //      //CONVERT TO STRING TO DECIMAL
        //     // var amount = decimal.Parse(template.DonationAmount);

        //     // Convert the donation amount using ICurrency
        //    var convertedAmount = await _currencyConverter.ConvertCurrency(template.DonationAmount, "USD", "SGD");

        //     // Set the converted amount in the Donations object
        //     template.DonationAmount = decimal.Parse(convertedAmount);
        //     return template;
        // }

        // Return all Donations
        public async Task<ActionResult<string>> All()
        {
            var donations = await donationsRepoOut.GetAllAsync();
            return JsonConvert.SerializeObject(new {success = true, data = donations}, settings);
        }

        // Create a Donations
        public async Task<ActionResult<string>> Create(Donations template)
        {
            if (template is MonetaryDonations monetaryTemplate) {
                // Convert the donation amount using ICurrency
                // CONVERT TO STRING TO DECIMAL
                var amount = decimal.Parse(monetaryTemplate.DonationAmount);
                var convertedAmount = await _currencyConverter.ConvertCurrency(amount, "SGD", "SGD");
                monetaryTemplate.DonationAmount = convertedAmount;
                template = monetaryTemplate;
                
            }
        //     //CONVERT TO STRING TO DECIMAL
        //     var amount = decimal.Parse(template.DonationAmount);

        //     // Convert the donation amount using ICurrency
        //    var convertedAmount = await _currencyConverter.ConvertCurrency(amount, "USD", "SGD");

        //     // Set the converted amount in the Donations object
        //     template.DonationAmount = convertedAmount;

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
            settings.ColumnSettings.Add("ItemName", new ColumnHeader{displayHeader = "Item Name"});
            settings.ColumnSettings.Add("ItemDescription", new ColumnHeader{displayHeader = "Item Description"});
            settings.ColumnSettings.Add("ItemQuantity", new ColumnHeader{displayHeader = "Item Quantity"});

            settings.FieldSettings.Add("DonationsId", new InputType{type = "text", displayLabel= "Donation ID", editable = false, primaryKey = true});
            settings.FieldSettings.Add("DonationType", new InputType{type = "text", displayLabel= "Donation Type", editable = false, primaryKey = false});
            settings.FieldSettings.Add("DonationAmount", new InputType{type = "number", displayLabel= "Donation Amount", editable = true, primaryKey = false});
            settings.FieldSettings.Add("DonationConstraint", new InputType{type = "text", displayLabel= "Donation Constraint", editable = true, primaryKey = false});
            settings.FieldSettings.Add("DonationDate", new InputType{type = "datetime", displayLabel= "Donation Date", editable = true, primaryKey = false});
            settings.FieldSettings.Add("ItemName", new InputType{type="text", displayLabel= "Item Name", editable = true, primaryKey = false});
            settings.FieldSettings.Add("ItemDescription", new InputType{type="text", displayLabel= "Item Description", editable = true, primaryKey = false});
            settings.FieldSettings.Add("ItemQuantity", new InputType{type="number", displayLabel= "Item Quantity", editable = true, primaryKey = false});

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