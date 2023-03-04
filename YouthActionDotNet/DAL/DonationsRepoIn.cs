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

        //Create Donation
        public async Task<Donations> CreateDonation(string donorId, string donationType, string donationConstraint, string donationAmount, string projectId){
            Donations template = new Donations();
            template.DonorId = donorId;
            template.DonationType = donationType;
            template.DonationAmount = donationAmount;
            template.DonationConstraint = donationConstraint;
            template.DonationDate = DateTime.Now;
            template.ProjectId = projectId;

            dbSet.Add(template);
            context.SaveChanges();
            return await dbSet.FirstOrDefaultAsync(d => d.DonorId == donorId && d.DonationType == donationType && d.DonationAmount == donationAmount && d.ProjectId == projectId);
        }
        
    }
}