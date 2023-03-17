using System.Threading.Tasks;

public class CurrencyConverterAdapter : ICurrency
{
    private readonly CurrencyConverterService _service;

    public CurrencyConverterAdapter(string apiKey)
    {
        _service = new CurrencyConverterService(apiKey);
    }

    public async Task<string> ConvertCurrency(decimal amount, string sourceCurrency, string targetCurrency)
    {
        var convertedAmount = await _service.Convert(amount, sourceCurrency, targetCurrency);
        return $"{convertedAmount:N2}";
    }

}
