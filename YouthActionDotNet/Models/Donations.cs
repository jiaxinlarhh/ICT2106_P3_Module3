using System;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models{
    // Donations class will be abstract
    public abstract class Donations {
        public Donations(){
            this.DonationsId = Guid.NewGuid().ToString();
        }
        
        public string DonationsId { get; set; }

        public string DonationType  { get; set; }

        // commented out DonationAmount as that is declared in the concrete class MonetaryDonations
        // public string DonationAmount { get; set; }

        // public string DonationConstraint { get; set; } 

        public DateTime DonationDate { get; set; }

        public string DonorId { get; set; }

        public string ProjectId { get; set; }

        [JsonIgnore]
        public virtual Donor donor { get; set; }
        [JsonIgnore]
        public virtual Project project { get; set; }
        // added this below
        protected void setDonation(string donationType, DateTime donationDate) { 
            this.DonationType = donationType;
            this.DonationDate = donationDate;
        }
    }
}