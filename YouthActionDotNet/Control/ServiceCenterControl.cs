using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Controllers;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Control
{
    public class ServiceCenterControl : IUserInterfaceCRUD<ServiceCenter>, IServiceCentreRepoIn<ServiceCenter>
    {
        private GenericRepositoryIn<ServiceCenter> ServiceCenterRepositoryIn;
        private IServiceCentreRepoOut<ServiceCenter> ServiceCenterRepositoryOut;
        //private GenericRepositoryOut<ServiceCenter> ServiceCenterRepositoryOut;
        private GenericRepositoryIn<User> UserRepositoryIn;
        private GenericRepositoryOut<User> UserRepositoryOut;
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };
        public ServiceCenterControl(DBContext context)
        {
            ServiceCenterRepositoryIn = new GenericRepositoryIn<ServiceCenter>(context);
            ServiceCenterRepositoryOut = new GenericRepositoryOut<ServiceCenter>(context);
            UserRepositoryIn = new GenericRepositoryIn<User>(context);
            UserRepositoryOut = new GenericRepositoryOut<User>(context);
        }

        public bool Exists(string id)
        {
            return ServiceCenterRepositoryOut.GetByID(id) != null;
        }

        public async Task<ActionResult<string>> Create(ServiceCenter template)
        {
            var serviceCenter = await ServiceCenterRepositoryIn.InsertAsync(template);
            return JsonConvert.SerializeObject(new { success = true, message = "Service Center Created", data = serviceCenter }, settings);
        }

        public async Task<ActionResult<string>> Get(string id)
        {
            var serviceCenter = await ServiceCenterRepositoryOut.GetByIDAsync(id);
            if (serviceCenter == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
            }
            return JsonConvert.SerializeObject(new { success = true, data = serviceCenter, message = "Service Center Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> All()
        {
            var serviceCenter = await ServiceCenterRepositoryOut.GetAllAsync();
            return JsonConvert.SerializeObject(new { success = true, data = serviceCenter, message = "Service Center Successfully Retrieved" });
        }

        public async Task<ActionResult<string>> Update(string id, ServiceCenter template)
        {
            if (id != template.ServiceCenterId)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
            }
            await ServiceCenterRepositoryIn.UpdateAsync(template);
            try
            {
                return JsonConvert.SerializeObject(new { success = true, message = "Service Center Updated", data = template }, settings);

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, ServiceCenter template)
        {
            if (id != template.ServiceCenterId)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
            }
            await ServiceCenterRepositoryIn.UpdateAsync(template);
            try
            {
                var serviceCenter = await ServiceCenterRepositoryOut.GetAllAsync();
                return JsonConvert.SerializeObject(new { success = true, data = serviceCenter, message = "Service Center Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult<string>> Delete(string id)
        {
            var serviceCenter = await ServiceCenterRepositoryOut.GetByIDAsync(id);
            if (serviceCenter == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
            }
            await ServiceCenterRepositoryIn.DeleteAsync(serviceCenter);
            return JsonConvert.SerializeObject(new { success = true, message = "Service Center Deleted" });
        }

        public async Task<ActionResult<string>> Delete(ServiceCenter template)
        {
            var serviceCenter = await ServiceCenterRepositoryOut.GetByIDAsync(template.ServiceCenterId);
            if (serviceCenter == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Service Center Not Found" });
            }
            await ServiceCenterRepositoryIn.DeleteAsync(serviceCenter);
            return JsonConvert.SerializeObject(new { success = true, message = "Service Center Deleted" });
        }

        public string Settings()
        {
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();

            settings.ColumnSettings.Add("ServiceCenterId", new ColumnHeader { displayHeader = "ID" });
            settings.ColumnSettings.Add("ServiceCenterName", new ColumnHeader { displayHeader = "Service Center Name" });
            settings.ColumnSettings.Add("ServiceCenterAddress", new ColumnHeader { displayHeader = "Service Center Address" });
            settings.ColumnSettings.Add("RegionalDirectorId", new ColumnHeader { displayHeader = "Regional Director Name" });

            settings.FieldSettings.Add("ServiceCenterId", new InputType { type = "number", displayLabel = "ID", editable = false, primaryKey = true });
            settings.FieldSettings.Add("ServiceCenterName", new InputType { type = "text", displayLabel = "Service Center Name", editable = true, primaryKey = false });
            settings.FieldSettings.Add("ServiceCenterAddress", new InputType { type = "text", displayLabel = "Service Center Address", editable = true, primaryKey = false });

            var allEmployees = UserRepositoryOut.GetAll(filter: e => e.Role == "Employee");
            settings.FieldSettings.Add("RegionalDirectorId", new DropdownInputType
            {
                type = "dropdown",
                displayLabel = "Regional Director",
                editable = true,
                primaryKey = false,
                options = allEmployees.Select(
                    e => new DropdownOption
                    {
                        value = e.UserId,
                        label = e.username
                    }).ToList()
            });

            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Retrieved" });
        }


        public Task<bool> InsertAsync(ServiceCenter entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(ServiceCenter entityToUpdate)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(object id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(ServiceCenter entityToDelete)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ServiceCenter> GetAll(Expression<Func<ServiceCenter, bool>> filter = null, Func<IQueryable<ServiceCenter>, IOrderedQueryable<ServiceCenter>> orderBy = null, string includeProperties = "")
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ServiceCenter> GetAllAsync(Expression<Func<ServiceCenter, bool>> filter = null, Func<IQueryable<ServiceCenter>, IOrderedQueryable<ServiceCenter>> orderBy = null, string includeProperties = "")
        {
            throw new NotImplementedException();
        }

        public ServiceCenter GetByID(object id)
        {
            throw new NotImplementedException();
        }
    }
}
