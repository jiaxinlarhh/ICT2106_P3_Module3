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
using YouthActionDotNet.Control;
using Microsoft.Extensions.Logging;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGenericController : ControllerBase
    {
        private readonly IUserRequest userRequest;

        public UserGenericController(IUserRequest userRequest)
        {
            this.userRequest = userRequest;
        }

        [HttpPost("simulatedonorcountupdate/{newCount}")]
        public IActionResult SimulateDonorCountUpdate(int newCount)
        {
            userRequest.SimulateDonorCountUpdate(newCount);
            return Ok();
        }


        [HttpPost("simulateemployeecountupdate/{newCount}")]
        public IActionResult SimulateEmployeeCountUpdate(int newCount)
        {
            userRequest.SimulateEmployeeCountUpdate(newCount);
            return Ok();
        }

        [HttpPost("simulatevolunteercountupdate/{newCount}")]
        public IActionResult SimulateVolunteerCountUpdate(int newCount)
        {
            userRequest.SimulateVolunteerCountUpdate(newCount);
            return Ok();
        }
    }
}
