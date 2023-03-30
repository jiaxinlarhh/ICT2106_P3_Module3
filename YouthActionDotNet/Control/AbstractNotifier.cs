using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace YouthActionDotNet.Control
{
    public class AbstractNotifier
    {
        protected List<INotificationListener> listeners { get; } = new List<INotificationListener>();

        public void AddListener(INotificationListener listener)
        {
            listeners.Add(listener);
        }

        public void RemoveListener(INotificationListener listener)
        {
            listeners.Remove(listener);
        }

        public void NotifyListeners(int userCount)
        {
            foreach (var listener in listeners) {
                listener.UpdateUserNotification(userCount);
            }
        }
    }
}
