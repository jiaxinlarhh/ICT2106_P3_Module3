using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using YouthActionDotNet.Control;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceCentreBuilderController : ControllerBase
    {

        private readonly IServiceCentreBuilder serviceCentreBuilder_builder;

        public ServiceCentreBuilderController() 
        {
            serviceCentreBuilder_builder = new ServiceCentreBuilder();
        }

        //[HttpPost("BuildEmployee")]
        //public IActionResult BuildEmployee([FromBody] List<Employee> employees, List<string> serviceCentreName)
        //{
        //    if(employees == null || !employees.Any())
        //    {
        //        return BadRequest("Invalid employee data.");
        //    }

        //    var filteredEmployees = employees.Where(e => e.ServiceCenterName == serviceCentreName[1]).ToList();
        //    serviceCentreBuilder_builder.BuildEmployee(filteredEmployees);
        //    return Ok("Employee added successfully.");
        //}

        //[HttpPost("BuildProject")]
        //public IActionResult BuildProject([FromBody] List<Project> project, List<string> serviceCentreName)
        //{
        //    if (project == null || !project.Any())
        //    {
        //        return BadRequest("Invalid project data.");
        //    }

        //    //var filteredProjects = project.Where(p => p.ServiceCenterName == serviceCentreName[1]).ToList();
        //    //serviceCentreBuilder_builder.BuildProject(filteredProjects);
        //    return Ok("Project added successfully.");
        //}

        //[HttpPost("BuildDonor")]
        //public IActionResult BuildDonor([FromBody] List<Donor> donors, List<string> serviceCentreName)
        //{
        //    if(donors == null || !donors.Any())
        //    {
        //        return BadRequest("Invalid donor data.");
        //    }

        //    //var filteredDonors = donors.Where(d => d.ServiceCenterName == serviceCentreName[1]).ToList();
        //    //serviceCentreBuilder_builder.BuildProject(filteredDonors);
        //    return Ok("Donor added successfully");
        //}

        //[HttpPost("BuildVolunteer")]
        //public IActionResult BuildVolunteer([FromBody] List<Volunteer> volunteers, List<string> serviceCentreName)
        //{
        //    if (volunteers == null || !volunteers.Any())
        //    {
        //        return BadRequest("Invalid volunteers data.");
        //    }

        //    //var filteredVolunteers = volunteers.Where(v => v.ServiceCenterName == serviceCentreName[1]).ToList();
        //    //serviceCentreBuilder_builder.BuildProject(filteredVolunteers);
        //    return Ok("Volunteer added successfully");
        //}

        [HttpGet("build")]
        public IActionResult Build()
        {
            var serviceCentre = serviceCentreBuilder_builder.Build();
            return Ok(serviceCentre);
        }
    }
}
