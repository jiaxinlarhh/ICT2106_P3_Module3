using System;
using System.Collections;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YouthActionDotNet.Data;
using YouthActionDotNet.Models;

namespace YouthActionDotNet.DAL
{
    public class ReportRepositoryOut : GenericRepositoryOut<Models.Report>
    {
        private DbSet<Employee> employeeSet;

        private DbSet<Expense> expenseSet;

        private DbSet<Project> projectSet;

        private DbSet<Volunteer> volunteerSet;

        private DbSet<VolunteerWork> volunteerWorkSet;

        private DbSet<MonetaryDonations> moneyDonationSet;

        private DbSet<ItemDonations> itemDonationSet;
        
        public ReportRepositoryOut(DBContext context) :
            base(context)
        {
            this.context = context;
            this.dbSet = context.Set<Report>();
            this.volunteerSet = context.Set<Models.Volunteer>();
            this.volunteerWorkSet = context.Set<Models.VolunteerWork>();
            this.employeeSet = context.Set<Models.Employee>();
            this.expenseSet = context.Set<Models.Expense>();
            this.projectSet = context.Set<Models.Project>();
            this.moneyDonationSet = context.Set<Models.MonetaryDonations>();
            this.itemDonationSet = context.Set<Models.ItemDonations>();
        }

        public async Task<IList> getEmployeeExpenseReportData(string  reportStartDate, string reportEndDate, string projectId)
        {
            var employeeExpenseArray = await employeeSet.Join(expenseSet, employee => employee.UserId, expense => expense.user.UserId, (employee, expense) => new { employee, expense })
                .Where(x => x.expense.DateOfSubmission >= DateTime.Parse(reportStartDate) && x.expense.DateOfSubmission <= DateTime.Parse(reportEndDate))
                .Where(y => y.expense.ProjectId == projectId)
                .Select(z => new EmployeeExpenseReport
                {
                    EmployeeName = z.employee.username,
                    EmployeeNationalId = z.employee.EmployeeNationalId,
                    DateJoined = z.employee.DateJoined,
                    EmployeeType = z.employee.EmployeeType,
                    EmployeeRole = z.employee.EmployeeRole,
                    ExpenseId = z.expense.ExpenseId,
                    ExpenseAmount = z.expense.ExpenseAmount,
                    ExpenseDescription = z.expense.ExpenseDesc,
                    ExpenseReceipt = z.expense.ExpenseReceipt,
                    Status = z.expense.Status,
                    DateOfExpense = z.expense.DateOfExpense,
                    DateOfSubmission = z.expense.DateOfSubmission,
                    DateOfReimbursement = z.expense.DateOfReimbursement,
                    ApprovalName = z.expense.user.username
                }).ToListAsync();
            return employeeExpenseArray;
        }
        public async Task<IList> getVolunteerWorkReportData(string reportStartDate, string reportEndDate, string projectId){
            Console.WriteLine(projectId);
            Console.WriteLine(reportStartDate);
            var volunteerWorkArray = await volunteerSet.Join(volunteerWorkSet, volunteer => volunteer.UserId, volunteerWork => volunteerWork.volunteer.UserId, (volunteer, volunteerWork) => new { volunteer, volunteerWork })
                .Where(x => x.volunteerWork.ShiftStart >= DateTime.Parse(reportStartDate) && x.volunteerWork.ShiftEnd <= DateTime.Parse(reportEndDate))
                .Where(y => y.volunteerWork.projectId == projectId)
                .Select(z => new {
                    volunteerNationalId = z.volunteer.VolunteerNationalId,
                    volunteerName = z.volunteer.username,
                    volunteerDateJoined = z.volunteer.VolunteerDateJoined,
                    volunteerQualifications = z.volunteer.Qualifications,
                    volunteerCriminalHistory = z.volunteer.CriminalHistory,
                    volunteerCriminalHistoryDesc = z.volunteer.CriminalHistoryDesc,
                    shiftStart = z.volunteerWork.ShiftStart,
                    shiftEnd = z.volunteerWork.ShiftEnd,
                    supervisingEmployee = z.volunteerWork.employee.username,
                    projectId = z.volunteerWork.project.ProjectName
                }).ToListAsync();
            return volunteerWorkArray;
        }
        public async Task<IList> getDonationsReportData(string projectId){
            double sum, noOfItems;
            sum = moneyDonationSet.Where(y => y.ProjectId == projectId).AsEnumerable().Select(x => Double.Parse(x.DonationAmount)).Sum();
            Console.WriteLine("sum of donations"+ sum);
            noOfItems = itemDonationSet.Where(y => y.ProjectId == projectId).AsEnumerable().Select(x => Double.Parse(x.ItemQuantity)).Sum();
            Console.WriteLine("no of items"+ noOfItems);

            if(sum !=0 && noOfItems != 0){
                var donateWithBothArray = await projectSet
                .Join(
                    itemDonationSet, 
                    projects => projects.ProjectId, 
                    item => item.ProjectId, 
                    (projects, item) => new {projects, item})
                .Join(
                    moneyDonationSet, 
                    combined => combined.projects.ProjectId,
                    money => money.ProjectId,
                    (combined, money) => new {combined, money})
                .Where(k => k.combined.projects.ProjectId == projectId)
                .Select(z => new DonationsReport {
                    projectId = z.combined.projects.ProjectId,
                    projectName = z.combined.projects.ProjectName,
                    totalDonations = sum.ToString(),
                    projectBudget = z.combined.projects.ProjectBudget.ToString(),
                    projectRemainders = (z.combined.projects.ProjectBudget-sum).ToString(),
                    monetaryDonateDate = z.money.DonationDate,
                    itemDonateDate = z.combined.item.DonationDate,
                    totalItems = noOfItems.ToString(),
                    generatedDate = DateTime.Today
                })
                .ToListAsync();
                return donateWithBothArray;
            }
            else if (sum !=0 && noOfItems ==0){
                var donateWithMoneyArray = await projectSet
                .Join(
                    moneyDonationSet, 
                    projects => projects.ProjectId,
                    money => money.ProjectId,
                    (projects, money) => new {projects, money})
                .Where(k => k.projects.ProjectId == projectId)
                .Select(z => new DonationsReport {
                    projectId = z.projects.ProjectId,
                    projectName = z.projects.ProjectName,
                    totalDonations = sum.ToString(),
                    projectBudget = z.projects.ProjectBudget.ToString(),
                    projectRemainders = (z.projects.ProjectBudget-sum).ToString(),
                    monetaryDonateDate = z.money.DonationDate,
                    itemDonateDate = DateTime.MinValue,
                    totalItems = noOfItems.ToString(),
                    generatedDate = DateTime.Today
                })
                .ToListAsync();
                return donateWithMoneyArray;
            }
            else if (sum ==0 && noOfItems !=0){
                var donateWithItemArray = await projectSet
                .Join(
                    itemDonationSet, 
                    projects => projects.ProjectId, 
                    item => item.ProjectId, 
                    (projects, item) => new {projects, item})
                .Where(k => k.projects.ProjectId == projectId)
                .Select(z => new DonationsReport {
                    projectId = z.projects.ProjectId,
                    projectName = z.projects.ProjectName,
                    totalDonations = sum.ToString(),
                    projectBudget = z.projects.ProjectBudget.ToString(),
                    projectRemainders = (z.projects.ProjectBudget-sum).ToString(),
                    monetaryDonateDate = DateTime.MinValue,
                    itemDonateDate = z.item.DonationDate,
                    totalItems = noOfItems.ToString(),
                    generatedDate = DateTime.Today
                })
                .ToListAsync();
                return donateWithItemArray;
            }
            var donateWithNothingArray = await projectSet
                .Where(k => k.ProjectId == projectId)
                .Select(z => new DonationsReport {
                    projectId = z.ProjectId,
                    projectName = z.ProjectName,
                    totalDonations = sum.ToString(),
                    projectBudget = z.ProjectBudget.ToString(),
                    projectRemainders = z.ProjectBudget.ToString(),
                    monetaryDonateDate = DateTime.MinValue,
                    itemDonateDate = DateTime.MinValue,
                    totalItems = noOfItems.ToString(),
                    generatedDate = DateTime.Today
                })
                .ToListAsync();
                return donateWithNothingArray;
        }
    }
}
