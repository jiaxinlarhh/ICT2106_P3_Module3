using System.Collections.Generic;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Control
{
    public class ServiceCentreBuilder : IServiceCentreBuilder
    {
        private List<Employee> _employees = new List<Employee>();
        private List<Project> _projects = new List<Project>();
        private List<Donor> _donors = new List<Donor>();
        private List<Volunteer> _volunteers = new List<Volunteer>();

        public void BuildEmployee(List<Employee> employee)
        {
            _employees.AddRange(employee);
        }

        public void BuildProject(List<Project> project)
        {
            _projects.AddRange(project);
        }

        public void BuildDonor(List<Donor> donor)
        {
            _donors.AddRange(donor);
        }

        public void BuildVolunteer(List<Volunteer> volunteer)
        {
            _volunteers.AddRange(volunteer);
        }

        public IServiceCentreProduct Build()
        {
            return new ServiceCenterDetails(_employees, _projects, _volunteers, _donors);
        }
    }
}
