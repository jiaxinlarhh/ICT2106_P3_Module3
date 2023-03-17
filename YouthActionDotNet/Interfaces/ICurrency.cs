using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public interface ICurrency
{
    Task<string> ConvertCurrency(decimal amount, string sourceCurrency, string targetCurrency);
    
}