using System.Collections.Generic;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.Control
{
    public interface IServiceCentreBuilder
    {
        void BuildEmployee(List<Employee> employee);
        void BuildProject(List<Project> project);
        void BuildDonor(List<Donor> donor);
        void BuildVolunteer(List<Volunteer> volunteer);
        IServiceCentreProduct Build();
    }
}
