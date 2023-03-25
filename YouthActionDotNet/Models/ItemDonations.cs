using System;

namespace YouthActionDotNet.Models {
    public class ItemDonations: Donations {
        // public ItemDonations() : base() {}

        public string ItemName {get; set;}

        public string ItemDescription {get; set;}

        public string ItemQuantity {get; set;}

        public ItemDonations(string itemName, string itemDescription, string itemQuantity) {
            base.setDonation("Item", DateTime.Now);
            this.ItemName = itemName;
            this.ItemDescription = itemDescription;
            this.ItemQuantity = itemQuantity;
        }
    } 
}