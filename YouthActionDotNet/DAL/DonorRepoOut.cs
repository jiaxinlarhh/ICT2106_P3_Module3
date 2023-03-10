using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.DAL
{
    public class DonorRepoOut : GenericRepositoryOut<Donor>
    {   
        public DonorRepoOut(DBContext context) : base(context)
        {
            this.context = context;
            this.dbSet = context.Set<Donor>();
        }

    }
}