using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public interface IDonation
{
    Task<ActionResult<string>> GetByDonorId(string id);

    Task<ActionResult<string>> GetByProjectId(string id);

    Task<ActionResult<string>> GetAll();
    
}