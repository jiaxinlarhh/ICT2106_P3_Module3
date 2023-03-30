using Microsoft.AspNetCore.SignalR;
using System;

namespace YouthActionDotNet.Control
{
    public class NotificationObserver : INotificationListener
    {
        private readonly IHubContext<UserGenericCountHub> hubContext;

        public NotificationObserver(IHubContext<UserGenericCountHub> hubContext)
        {
            this.hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
        }

        public async void UpdateUserNotification(int userCount)
        {
            if (userCount <= 5) 
            {
                // performing some action
                await this.hubContext.Clients.All.SendAsync("UpdatedUserCount", userCount);
                System.Diagnostics.Debug.WriteLine("Hello");
            }
        }
    }
}
