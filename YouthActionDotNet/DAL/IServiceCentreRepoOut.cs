using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace YouthActionDotNet.DAL
{
    public interface IServiceCentreRepoOut<T> where T : class
    {
        IEnumerable<T> GetAll(Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "");

        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "");

        T GetByID(object id);

        Task<T> GetByIDAsync(object id);
    }
}
