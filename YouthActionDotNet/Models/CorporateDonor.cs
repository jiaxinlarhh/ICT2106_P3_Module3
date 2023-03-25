
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models
{
    public class IndividualDonor : Donor
    {
        // Properties specific to individual donors
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}