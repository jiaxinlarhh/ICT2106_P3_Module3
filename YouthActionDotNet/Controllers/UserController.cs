using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;
namespace YouthActionDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase, IUserInterfaceCRUD<User>
    {
        private readonly DBContext _context;

        public UserController(DBContext context)
        {
            _context = context;
        }

        // To login the user
        // POST: api/User/Login
        [HttpPost("Login")]
        public async Task<ActionResult<String>> LoginUser(User user)
        {
            SHA256 sha256 = SHA256.Create();
            var secretPw = Convert.ToHexString(sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(user.Password)));
            sha256.Dispose();

            var validLoginUser = _context.Users.Where(u => u.username == user.username && u.Password == secretPw).FirstOrDefault();
            if (validLoginUser == null)
            {
                return JsonConvert.SerializeObject(new { success = false, message = "Invalid Username or Password" });
            }
            return JsonConvert.SerializeObject(new { success = true, message = "Login Successful", user=validLoginUser });
        }
        

        [HttpPost("Create")]
        public async Task<ActionResult<string>> Create(User template)
        {
            //check if user exists
            template.UserId = Guid.NewGuid().ToString();
            //check if user exists
            SHA256 sha256 = SHA256.Create();
            var secretPw = Convert.ToHexString(sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(template.Password)));

            template.Password = secretPw;
            sha256.Dispose();
            var userPL = await _context.Users.Where(u => u.username == template.username).FirstOrDefaultAsync();
            if(userPL != null){
                return JsonConvert.SerializeObject(new {success=false,message="User Already Exists"});
            }
            
            _context.Users.Add(template);
            await _context.SaveChangesAsync();

            CreatedAtAction("GetUser", new { id = template.UserId }, template);
            //return the user in json format
            return JsonConvert.SerializeObject(new {success=true,message="User Successfully Created", data = template});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "User Not Found"});
            }
            return JsonConvert.SerializeObject(new {success = true, data = user, message = "User Successfully Retrieved"});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Update(string id, User template)
        {
            if(id != template.UserId){
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Volunteer Id Mismatch" });
            }
            _context.Entry(template).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return JsonConvert.SerializeObject(new { success = true, data = template, message = "Volunteer Successfully Updated" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Volunteer Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }
    
        [HttpPut("UpdateAndFetch/{id}")]
        public async Task<ActionResult<string>> UpdateAndFetchAll(string id, User template)
        {
            if(id != template.UserId){
                return JsonConvert.SerializeObject(new { success = false, data = "", message = "Volunteer Id Mismatch" });
            }
            _context.Entry(template).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return await All();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return JsonConvert.SerializeObject(new { success = false, data = "", message = "Volunteer Not Found" });
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return JsonConvert.SerializeObject(new {success = false, message = "User Not Found"});
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return JsonConvert.SerializeObject(new {success = true, data = user, message = "User Successfully Deleted"});
        }

        [HttpGet("All")]
        public async Task<ActionResult<string>> All()
        {
            var users = await _context.Users.ToListAsync();
            return JsonConvert.SerializeObject(new {success = true, data = users, message = "Users Successfully Retrieved"});
        }
        [HttpGet("Settings")]
        public string Settings()
        {   
            Settings settings = new Settings();
            settings.ColumnSettings = new Dictionary<string, ColumnHeader>();
            settings.FieldSettings = new Dictionary<string, InputType>();
            
            settings.ColumnSettings.Add("UserId", new ColumnHeader { displayHeader = "User Id" });
            settings.ColumnSettings.Add("username", new ColumnHeader { displayHeader = "Username" });
            settings.ColumnSettings.Add("Email", new ColumnHeader { displayHeader = "Email" });
            settings.ColumnSettings.Add("Password", new ColumnHeader { displayHeader = "Password" });
            settings.ColumnSettings.Add("Role", new ColumnHeader { displayHeader = "Role" });
            
            settings.FieldSettings.Add("UserId", new InputType { type = "number", displayLabel = "User Id", editable = false, primaryKey = true });
            settings.FieldSettings.Add("username", new InputType { type = "text", displayLabel = "Username", editable = true, primaryKey = false });
            settings.FieldSettings.Add("Email", new InputType { type = "text", displayLabel = "Email", editable = true, primaryKey = false });
            settings.FieldSettings.Add("Password", new InputType { type = "text", displayLabel = "Password", editable = true, primaryKey = false });
            settings.FieldSettings.Add("Role", new DropdownInputType { type = "dropdown", displayLabel = "Role", editable = true, primaryKey = false, options = new List<DropdownOption> {
                new DropdownOption { value = "Admin", label = "Admin" },
                new DropdownOption { value = "Employee", label = "Employee" },
                new DropdownOption { value = "Volunteer", label = "Volunteer" },
                new DropdownOption { value = "Donor", label = "Donor" },
            } });
            return JsonConvert.SerializeObject(new { success = true, data = settings, message = "Settings Successfully Retrieved" });
        }

        public bool Exists(string id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
