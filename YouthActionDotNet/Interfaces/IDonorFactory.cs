using YouthActionDotNet.Models;

public interface IDonorFactory
{
    Donor CreateDonor(string donorType);
}