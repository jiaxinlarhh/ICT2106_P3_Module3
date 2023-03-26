
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models
{
    public class CorporateDonor : Donor
    {
        // Properties specific to individual donors
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
    }
}