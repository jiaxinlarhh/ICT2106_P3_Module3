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
using YouthActionDotNet.DAL;
using YouthActionDotNet.Control;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase, IUserInterfaceCRUD<Request>
    {
        private RequestControl requestControl;
        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        public RequestController(DBContext context)
        {
            requestControl = new RequestControl(context);
        }

        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            return await requestControl.All();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {
            return await requestControl.Get(id);
        }

        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Request template)
        {
            return await requestControl.Create(template);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Request template)
        {
            return await requestControl.Update(id, template);
        }

        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Request template)
        {
            return await requestControl.UpdateAndFetchAll(id, template);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await requestControl.Delete(id);
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult<String>> Delete(Request template)
        {
            return await requestControl.Delete(template);
        }

        public bool Exists(string id)
        {
            return requestControl.Get(id) != null;
        }

        [HttpGet("Settings")]
        public string Settings()
        {
            return requestControl.Settings();
        }
    }
}
