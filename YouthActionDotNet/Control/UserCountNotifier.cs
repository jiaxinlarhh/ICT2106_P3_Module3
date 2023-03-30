namespace YouthActionDotNet.Control
{
    public class UserCountNotifier : AbstractNotifier
    {
        private int _threshold = 5;
        private AbstractNotifier abstractNotifier = new AbstractNotifier();


        public void SetThreshold(int threshold)
        {
            _threshold = threshold;
        }

        public void CheckAndNotifyDonor(int userCount)
        {
            if (userCount <= _threshold)
            {
                abstractNotifier.NotifyListeners(userCount);
            }
        }

        public void CheckAndNotifyEmployee(int userCount)
        {
            if (userCount <= _threshold)
            {
                abstractNotifier.NotifyListeners(userCount);
            }
        }

        public void CheckAndNotifyVolunteer(int userCount)
        {
            if (userCount <= _threshold)
            {
                abstractNotifier.NotifyListeners(userCount);
            }
        }

        public new void AddListener(INotificationListener listener)
        {
            abstractNotifier.AddListener(listener);
        }
    }
}
