using System.Collections.Generic;

namespace YouthActionDotNet.Control
{
    public class UserGeneric : IUserRequest
    {

        private int donorCount;
        private int volunteerCount;
        private int employeeCount;
        protected List<INotificationListener> listeners;
        private readonly UserCountNotifier notifier;

        public UserGeneric(INotificationListener notificationListener)
        {
            donorCount = 0;
            this.notifier = new UserCountNotifier();
            

            // Add listeners to the notifier
            this.notifier.AddListener(notificationListener);
        }

        private int GetDonorCount()
        {
            return donorCount;
        }

        private int GetVolunteerCount()
        {
            return volunteerCount;
        }

        private int GetEmployeeCount()
        { 
            return employeeCount; 
        }   

        public void SimulateDonorCountUpdate(int newCount)
        {
            SetDonorCount(newCount);
        }

        public void SimulateEmployeeCountUpdate(int newCount)
        {
            SetEmployeeCount(newCount);
        }

        public void SimulateVolunteerCountUpdate(int newCount)
        {
            SetVolunteerCount(newCount);
        }

        private void SetDonorCount(int count)
        {
            donorCount= count;
            if(donorCount <= 5)
            {
                this.notifier.CheckAndNotifyDonor(donorCount);
            }
        }

        private void SetEmployeeCount(int count)
        {
            donorCount = count;
            if (donorCount <= 5)
            {
                this.notifier.CheckAndNotifyEmployee(donorCount);
            }
        }

        private void SetVolunteerCount(int count)
        {
            donorCount = count;
            if (donorCount <= 5)
            {
                this.notifier.CheckAndNotifyVolunteer(donorCount);
            }
        }
    }
}
