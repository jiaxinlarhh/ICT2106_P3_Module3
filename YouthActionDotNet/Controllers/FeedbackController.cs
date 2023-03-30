using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Control;
using YouthActionDotNet.DAL;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FeedbackController : ControllerBase, IUserInterfaceCRUD<Feedback>
    {

        private FeedbackControl feedbackControl;

        public FeedbackController(DBContext context)
        {
            feedbackControl = new FeedbackControl(context);
        }

        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            return await feedbackControl.All();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(Feedback template)
        {
            return await feedbackControl.Create(template);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            return await feedbackControl.Delete(id);
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> Delete(Feedback template)
        {
            return await feedbackControl.Delete(template);
        }

        public bool Exists(string id)
        {
            return feedbackControl.Exists(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {
            return await feedbackControl.Get(id);
        }

        [HttpGet("Settings")]
        public string Settings()
        {
            return feedbackControl.Settings();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, Feedback template)
        {
            return await feedbackControl.Update(id, template);
        }

        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, Feedback template)
        {
            return await feedbackControl.UpdateAndFetchAll(id, template);
        }

    }

}