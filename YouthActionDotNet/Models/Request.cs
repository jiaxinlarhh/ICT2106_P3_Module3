using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace YouthActionDotNet.Models
{
    // public class Request: AbstractForm
    public class Request
    {

        // public Request()
        // {
        //     this.FormID = Guid.NewGuid().ToString();
        // }

        
        // private string ProjectId { get; set; }
        // private string RequestResourceTypeTime { get; set; }
        // private string RequestResourceTypeSpace { get; set; }
        // private string RequestResourceTypeDonor { get; set; }
        // private string RequestResourceTypeMoney { get; set; }
        // private string RequestResourceTypeVolunteer { get; set; }
        // private string RequestDescription { get; set; }
        // private string Status { get; set; }

        // [JsonIgnore]
        // public virtual User user { get; set; }
        // [JsonIgnore]
        // public virtual Project project { get; set; }



        
        // public void setRequestFormDetails(string requestId, string requestResourceTypeTime, string requestResourceTypeSpace, string requestResourceTypeDonor, string requestResourceTypeMoney, string requestResourceTypeVolunteer, string requestDescription, string requesterId, string status, string projectId, string requestDateTime)
        // {
        //     FormID = requestId;
        //     RequestResourceTypeTime = requestResourceTypeTime;
        //     RequestResourceTypeSpace = requestResourceTypeSpace;
        //     RequestResourceTypeDonor = requestResourceTypeDonor;
        //     RequestResourceTypeMoney = requestResourceTypeMoney;
        //     RequestResourceTypeVolunteer = requestResourceTypeVolunteer;
        //     RequestDescription = requestDescription;
        //     FormSenderID = requesterId;
        //     FormDateTime = requestDateTime;
        //     Status = status;
        //     ProjectId = projectId;
        // }

        public Request()
        {
            this.RequestId = Guid.NewGuid().ToString();
        }
        public string RequestId { get; set; }
        public string RequestResourceType { get; set; }        

        // used to be RequestReason
        public string RequestDesc { get; set; }
        public string Status { get; set; }
        // used to be RequestRequestedBy
        public string RequesterId { get; set; }
        public string ProjectId { get; set; }

        // used to be RequestDateTime
        public DateTime DateOfRequest { get; set; }

        // added later, for the date of agreeing to the request
        public DateTime DateOfApproval { get; set; }
        // added later, for the date of enacting the request requirements
        // couldn't come up with a better name, is Reimbursement okay in this context?
        public DateTime DateOfReimbursement { get; set; }

        [JsonIgnore]
        public virtual User user { get; set; }
        [JsonIgnore]
        public virtual Project project { get; set; }
        // [JsonIgnore]
        // public virtual File RequestFile { get; set; }



        

    }


    // public abstract class AbstractForm
    // {
    //     private int FormID { get; set; }
    //     private int FormSenderID { get; set; }
    //     private DateTime FormDateTime { get; set; }

    //     private int getFormID()
    //     {
    //         return this.FormID;
    //     }

    //     private void setFormID(int formID)
    //     {
    //         this.FormID = formID;
    //     }

    //     private int GetformSenderID()
    //     {
    //         return formSenderID;
    //     }

    //     private void SetformSenderID(int fsid)
    //     {
    //         formSenderID = fsid;
    //     }

    //     private DateTime getFormDateTime()
    //     {
    //         return this.FormDateTime;
    //     }

    //     private void setFormDateTime(DateTime formDateTime)
    //     {
    //         this.FormDateTime = formDateTime;
    //     }
    // }

}