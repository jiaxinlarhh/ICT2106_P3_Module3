using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models
{
    public class ServiceCenterDetails : IServiceCentreProduct
    {
        public List<Employee> Employees { get; set; }
        public List<Project> Projects { get; set; }
        public List<Donor> Donors { get; set; } 
        public List<Volunteer> Volunteers { get; set; } 

        public ServiceCenterDetails(List<Employee> employees, List<Project> projects, List<Volunteer> volunteers, List<Donor> donors)
        {
            Employees = employees;
            Projects = projects;
            Donors = donors;
            Volunteers = volunteers;
        }
    }

}
