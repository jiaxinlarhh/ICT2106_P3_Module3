using System;

namespace YouthActionDotNet.Models {
    
    public class MonetaryDonations : Donations {
        // base() refers to the constructor of Donations parent class
        // public MonetaryDonations() : base() {
        //     // left blank unless there's extra code needed for constructor of this class
        // }
        // DonationAmount could be decimal
        public string DonationAmount {get; set;}
        public string DonationConstraint {get; set;}

        public string PaymentMethod{get; set;}

        public MonetaryDonations(string donationAmount, string donationConstraint, string paymentMethod) {
            base.setDonation("Monetary", DateTime.Now); 
            this.DonationAmount = donationAmount;
            this.DonationConstraint = donationConstraint;
            this.PaymentMethod = paymentMethod;
        }
    }
}