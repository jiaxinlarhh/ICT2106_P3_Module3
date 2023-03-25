using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public interface IDonationCreate : IDonation
{
    Task<ActionResult<string>> CreateDonations();
}
