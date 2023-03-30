using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace YouthActionDotNet.Control
{
    public class UserGenericCountHub : Hub
    {
        public async Task DonorCount(int userCount)
        {
            await Clients.All.SendAsync("UpdatedUserCount", userCount);
        }
    }
}
