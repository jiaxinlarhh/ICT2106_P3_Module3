using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;
using Newtonsoft.Json;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Controllers;

namespace YouthActionDotNet.Control
{
    public class RequestControl : IUserInterfaceCRUD<Request>
    {

        private GenericRepositoryIn<Request> RequestRepositoryIn;
        private GenericRepositoryOut<Request> RequestRepositoryOut;
        private GenericRepositoryOut<Employee> EmployeeRepository;
        private GenericRepositoryOut<Project> ProjectRepository;
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public RequestControl(DBContext context)
        {
            RequestRepositoryIn = new GenericRepositoryIn<Request>(context);
            RequestRepositoryOut = new GenericRepositoryOut<Request>(context);
            EmployeeRepository = new GenericRepositoryOut<Employee>(context);
            ProjectRepository = new GenericRepositoryOut<Project>(context);
        }
        public async Task<ActionResult<string>> All()
        {
            var request = await RequestRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = request, message = "Request Successfully Retrieved" }, settings);
        }
        public async Task<ActionResult<string>> Get(string id)
        {
            var request = await RequestRepositoryOut.GetByIDAsync(id);
            if (request == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Request Not Found" }, settings);
            }
            return JsonConvert.SerializeObject(new { success = true, message = "Request Successfully Retrieved", data = request }, settings);
        }
        public async Task<ActionResult<string>> Create(Request template)
        {
            try
            {
                var request = await RequestRepositoryIn.InsertAsync(template);
                return JsonConvert.SerializeObject(new { success = true, message = "Request Created", data = request }, settings);

            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(new { success = false, message = e.Message }, settings);
            }
        }
        public async Task<ActionResult<string>> Update(string id, Request template)
        {
            if (id != template.RequestId)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Request ID Mismatch" }, settings);
            }
            await RequestRepositoryIn.UpdateAsync(template);
            try
            {
                return JsonConvert.SerializeObject(new { success = true, message = "Request Successfully Updated", data = template }, settings);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, message = "Request Not Found" }, settings);
                }
                else
                {
                    throw;
                }
            }
        }
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Request template)
        {
            if (id != template.RequestId)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Request ID Mismatch" }, settings);
            }
            await RequestRepositoryIn.UpdateAsync(template);
            try
            {
                var request = await RequestRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, message = "Request Successfully Updated", data = request }, settings);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, message = "Request Not Found" }, settings);
                }
                else
                {
                    throw;
                }
            }
        }
        public async Task<ActionResult<string>> Delete(string id)
        {
            var request = await RequestRepositoryOut.GetByIDAsync(id);
            if (request == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Request Not Found" }, settings);
            }
            await RequestRepositoryIn.DeleteAsync(request);
            return JsonConvert.SerializeObject(new { success = true, message = "Request Successfully Deleted" }, settings);
        }
        public async Task<ActionResult<String>> Delete(Request template)
        {
            var request = await RequestRepositoryOut.GetByIDAsync(template.RequestId);
            if (request == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Request Not Found" }, settings);
            }
            await RequestRepositoryIn.DeleteAsync(request);
            return JsonConvert.SerializeObject(new { success = true, message = "Request Successfully Deleted" }, settings);
        }

        public bool Exists(string id)
        {
            return RequestRepositoryOut.GetByID(id) != null;
        }
        public string Settings()
        {
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            settings.ColumnSettings.Add("RequestId", new ColumnHeader { displayHeader = "Request Id" });
            settings.ColumnSettings.Add("RequestResourceType", new ColumnHeader { displayHeader = "Resource Type" });
            settings.ColumnSettings.Add("Status", new ColumnHeader { displayHeader = "Status" });
            settings.ColumnSettings.Add("RequesterId", new ColumnHeader { displayHeader = "Requester Id" });
            settings.ColumnSettings.Add("ProjectId", new ColumnHeader { displayHeader = "Project Id" });

            settings.FieldSettings.Add("RequestId", new InputType { type = "text", displayLabel = "Request Id", editable = false, primaryKey = true });
            settings.FieldSettings.Add("RequestResourceType", new DropdownInputType
            {
                // considering text
                type = "dropdown",
                displayLabel = "Resource Type",
                editable = true,
                primaryKey = false,
                options = new List<DropdownOption>{
                new DropdownOption { value = "Donor", label = "Donor" },
                new DropdownOption { value = "Volunteer", label = "Volunteer" },
                new DropdownOption { value = "Employee", label = "Employee" },
                new DropdownOption { value = "Money", label = "Money" },
                new DropdownOption { value = "Space", label = "Space" },
                new DropdownOption { value = "Time", label = "Time" },
            }
            });

            settings.FieldSettings.Add("RequestDesc", new InputType { type = "text", displayLabel = "Request Description", editable = true, primaryKey = false });
            //settings.FieldSettings.Add("RequestReceipt", new InputType { type = "file", displayLabel = "Request Receipt", editable = true, primaryKey = false });

            settings.FieldSettings.Add("Status", new DropdownInputType
            {
                type = "dropdown",
                displayLabel = "Status",
                editable = true,
                primaryKey = false,
                options = new List<DropdownOption>{
                new DropdownOption { value = "Pending", label = "Pending" },
                new DropdownOption { value = "Sent", label = "Sent" },
                new DropdownOption { value = "Declined", label = "Declined" },
                new DropdownOption { value = "Approved", label = "Approved" }
            }
            });

            settings.FieldSettings.Add("DateOfRequest", new InputType { type = "datetime", displayLabel = "Date of Request", editable = true, primaryKey = false });
            //settings.FieldSettings.Add("DateOfApproval", new InputType { type = "datetime", displayLabel = "Date of Submission", editable = true, primaryKey = false });
            //settings.FieldSettings.Add("DateOfReimbursement", new InputType { type = "datetime", displayLabel = "Date of Reimbursement", editable = true, primaryKey = false });

            var employee = EmployeeRepository.GetAll();
            settings.FieldSettings.Add("RequesterId", new DropdownInputType
            {
                type = "dropdown",
                displayLabel = "Requester Id",
                editable = true,
                primaryKey = false,
                options = employee.Select(x => new DropdownOption { value = x.UserId, label = x.username }).ToList()
            });

            var project = ProjectRepository.GetAll();
            settings.FieldSettings.Add("ProjectId", new DropdownInputType
            {
                type = "dropdown",
                displayLabel = "Project Id",
                editable = true,
                primaryKey = false,
                options = project.Select(x => new DropdownOption { value = x.ProjectId, label = x.ProjectName }).ToList()
            });

            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Fetched" });

        }
    }
}