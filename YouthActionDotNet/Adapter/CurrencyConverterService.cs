using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public class CurrencyConverterService
{
    //aG3kk6LNE5obzTL94EiMLD8V7M0HOsyN
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;

    public CurrencyConverterService(string apiKey)
    {
        _apiKey = apiKey;
        _httpClient = new HttpClient();
    }

    public async Task<decimal> Convert(decimal amount, string sourceCurrency, string targetCurrency)
    {
        var exchangeRate = await GetExchangeRate(sourceCurrency, targetCurrency);
        var convertedAmount = amount * exchangeRate;
        return convertedAmount;
    }

    private async Task<decimal> GetExchangeRate(string sourceCurrency, string targetCurrency)
    {
        var url = $"https://api.apilayer.com/exchangerates_data/latest?base={sourceCurrency}&symbols={targetCurrency}&apikey={_apiKey}";
        var response = await _httpClient.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to retrieve exchange rate data. Status code: {response.StatusCode}. Content: {content}");
        }

        var json = JObject.Parse(content);
        var rate = json["rates"][targetCurrency].Value<decimal>();
        return rate;
    }
}
