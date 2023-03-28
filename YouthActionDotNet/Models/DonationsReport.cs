using System;
using System.Text.Json.Serialization;

namespace YouthActionDotNet.Models
{
    public class DonationsReport
    {
        public string projectId { get; set; }

        public string projectName { get; set; }

        public string totalDonations { get; set; }

        public string projectBudget { get; set; }

        public string projectRemainders { get; set; }

        public DateTime monetaryDonateDate { get; set; }

        public DateTime itemDonateDate { get; set; }

        public string totalItems { get; set; }

        public DateTime generatedDate { get; set; }
        
        protected void setDonationReport(string projectId, string projectName, string totalDonations, string projectBudget,
            string projectRemainders, DateTime monetaryDonateDate, DateTime itemDonateDate, string totalItems, DateTime generatedDate) { 
            this.projectId = projectId;
            this.projectName = projectName;
            this.totalDonations = totalDonations;
            this.projectBudget = projectBudget;
            this.projectRemainders = projectRemainders;
            this.monetaryDonateDate = monetaryDonateDate;
            this.itemDonateDate = itemDonateDate;
            this.totalItems = totalItems;
            this.generatedDate = generatedDate;
        }
    }
}
