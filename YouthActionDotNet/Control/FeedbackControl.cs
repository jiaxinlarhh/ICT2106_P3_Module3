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
{
    public class FeedbackControl : IUserInterfaceCRUD<Feedback>
    {
        private GenericRepositoryIn<Feedback> FeedbackRepositoryIn;
        private GenericRepositoryOut<Feedback> FeedbackRepositoryOut;
        private GenericRepositoryOut<ServiceCenter> ServiceCenterRepositoryOut;

        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public FeedbackControl(DBContext context)
        {
            FeedbackRepositoryIn = new GenericRepositoryIn<Feedback>(context);
            FeedbackRepositoryOut = new GenericRepositoryOut<Feedback>(context);
            ServiceCenterRepositoryOut = new GenericRepositoryOut<ServiceCenter>(context);
        }
        public bool Exists(string id)
        {
            if (FeedbackRepositoryOut.GetByIDAsync(id) != null)
            {
                return true;
            }
            return false;
        }

        public async Task<ActionResult<string>> All()
        {
            var feedback = await FeedbackRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = feedback }, settings);

        }

        public async Task<ActionResult<string>> Create(Feedback template)
        {
            var createdFeedback = await FeedbackRepositoryIn.InsertAsync(template);
            return JsonConvert.SerializeObject(new { success = true, message = "Feedback Created", data = createdFeedback }, settings);
        }

        public async Task<ActionResult<string>> Delete(string id)
        {
            var feedback = await FeedbackRepositoryOut.GetByIDAsync(id);
            if (feedback == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Feedback Not Found" }, settings);
            }

            await FeedbackRepositoryIn.DeleteAsync(feedback);
            return JsonConvert.SerializeObject(new { success = true, message = "Feedback Successfully Deleted" }, settings);
        }

        public async Task<ActionResult<string>> Delete(Feedback template)
        {
            var feedback = await FeedbackRepositoryOut.GetByIDAsync(template.FeedbackId);
            if (feedback == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Feedback Not Found" }, settings);
            }

            await FeedbackRepositoryIn.DeleteAsync(feedback);
            return JsonConvert.SerializeObject(new { success = true, message = "Feedback Successfully Deleted" }, settings);
        }

        public async Task<ActionResult<string>> Get(string id)
        {
            var feedback = await FeedbackRepositoryOut.GetByIDAsync(id);
            if (feedback == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Feedback Not Found" }, settings);
            }
            return JsonConvert.SerializeObject(new { success = true, data = feedback }, settings);
        }

        

        public async Task<ActionResult<string>> Update(string id, Feedback template)
        {
            if (id != template.FeedbackId)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Feedback ID Mismatch" }, settings);
            }
            await FeedbackRepositoryIn.UpdateAsync(template);
            try
            {
                var updatedFeedback = await FeedbackRepositoryOut.GetByIDAsync(id);
                return JsonConvert.SerializeObject(new { success = true, data = updatedFeedback }, settings);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, message = "Feedback Not Found" }, settings);
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Feedback template)
        {
            if (id != template.FeedbackId)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Feedback ID Mismatch" }, settings);
            }
            await FeedbackRepositoryIn.UpdateAsync(template);
            try
            {
                var updatedFeedback = await FeedbackRepositoryOut.GetByIDAsync(id);
                var feedback = await FeedbackRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = feedback }, settings);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, message = "Feedback Not Found" }, settings);
                }
                else
                {
                    throw;
                }
            }
        }

        public string Settings()
        {
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            settings.ColumnSettings.Add("FeedbackId", new ColumnHeader { displayHeader = "Feedback ID" });
            settings.ColumnSettings.Add("FeedbackSubject", new ColumnHeader { displayHeader = "Feedback Subject" });
            settings.ColumnSettings.Add("FeedbackMessage", new ColumnHeader { displayHeader = "Feedback Message" });
            settings.ColumnSettings.Add("FeedbackStatus", new ColumnHeader { displayHeader = "Feedback Status" });
            settings.ColumnSettings.Add("FeedbackDateTime", new ColumnHeader { displayHeader = "Feedback Date Time" });
            settings.ColumnSettings.Add("ServiceCenterId", new ColumnHeader { displayHeader = "Service Center ID" });

            settings.FieldSettings.Add("FeedbackId", new InputType { type = "text", displayLabel = "Feedback ID", editable = false, primaryKey = true });
            settings.FieldSettings.Add("FeedbackSubject", new InputType { type = "text", displayLabel = "Feedback Subject", editable = true, primaryKey = false });
            settings.FieldSettings.Add("FeedbackMessage", new InputType { type = "text", displayLabel = "Feedback Message", editable = true, primaryKey = false });
            settings.FieldSettings.Add("FeedbackStatus", new InputType { type = "text", displayLabel = "Feedback Status", editable = true, primaryKey = false });
            settings.FieldSettings.Add("FeedbackDateTime", new InputType { type = "datetime", displayLabel = "Feedback Date Time", editable = true, primaryKey = false });



            var servicecenters = ServiceCenterRepositoryOut.GetAll();
            settings.FieldSettings.Add("ServiceCenterId", new DropdownInputType
            {
                type = "dropdown",
                displayLabel = "Service Center",
                editable = true,
                primaryKey = false,
                options = servicecenters.Select(x => new DropdownOption { value = x.ServiceCenterId, label = x.ServiceCenterName }).ToList()

            });

            return JsonConvert.SerializeObject(new { success = true, data = settings });
        }
    }
}
