using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;
using YouthActionDotNet.Models;
using System.Threading.Tasks;

namespace YouthActionDotNet.DAL
{
    public interface IServiceCentreRepoIn<T> where T : class
    {
        Task<bool> InsertAsync(T entity);
        Task<bool> UpdateAsync(T entityToUpdate);
        Task<bool> DeleteAsync(object id);
        Task<bool> DeleteAsync(T entityToDelete);
    }
}
