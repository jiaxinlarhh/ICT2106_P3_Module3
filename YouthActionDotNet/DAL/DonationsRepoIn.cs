using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.DAL
{
    public class DonationsRepoIn : GenericRepositoryIn<Donations>
    {   
        public DonationsRepoIn(DBContext context) : base(context)
        {
            this.context = context;
            this.dbSet = context.Set<Donations>();
        }
        
    }
}