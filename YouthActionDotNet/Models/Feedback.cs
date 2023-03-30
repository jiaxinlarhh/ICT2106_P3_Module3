using System;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models
{

    public class Feedback
    {
        public Feedback()
        {
            this.FeedbackId = Guid.NewGuid().ToString();
        }

        public string FeedbackId { get; set; }

        public string FeedbackSubject { get; set; }

        public string FeedbackMessage { get; set; }

        public string FeedbackStatus { get; set; }

        public DateTime FeedbackDateTime { get; set; }

        public string ServiceCenterId { get; set; }

        public string ServiceCenterName { get; set; }


        [JsonIgnore]
        public virtual ServiceCenter servicecenter { get; set; }
    }
}