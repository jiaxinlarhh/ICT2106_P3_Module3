using System.Collections.Generic;

namespace YouthActionDotNet.Models
{
    public interface IServiceCentreProduct
    {
        List<Employee> Employees { get; set; }
        List<Project> Projects { get; set; }
        List<Donor> Donors { get; set; }
        List<Volunteer> Volunteers { get; set; }
    }
}
