using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.DAL
{
    public class DonationsRepoOut : GenericRepositoryOut<Donations>
    {   
        public DonationsRepoOut(DBContext context) : base(context)
        {
            this.context = context;
            this.dbSet = context.Set<Donations>();
        }

         public async Task<List<Donations>> GetByDonationId(string id){
            return await dbSet.Where(d => d.DonationsId == id).ToListAsync();
        }
        
        public async Task<List<Donations>> GetByDonorId(string id){
            return await dbSet.Where(d => d.DonorId == id).ToListAsync();
        }

         public async Task<List<Donations>> GetByProjectId(string id){
            return await dbSet.Where(d => d.ProjectId == id).ToListAsync();
        }

        public async Task<List<Donations>> GetAll(){
            return await dbSet.ToListAsync();
        }

    }
}