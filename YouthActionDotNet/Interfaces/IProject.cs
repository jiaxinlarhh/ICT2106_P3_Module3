using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public interface IProject
{
    Task<ActionResult<string>> GetAllProjects();
    
}