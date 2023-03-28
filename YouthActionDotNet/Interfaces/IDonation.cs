using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public interface IDonation
{
    Task<ActionResult<string>> GetDonationByID(string id);
  
    
}