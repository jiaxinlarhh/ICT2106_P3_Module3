namespace YouthActionDotNet.Control
{
    public interface IUserRequest
    {
        void SimulateDonorCountUpdate(int newCount);
        void SimulateEmployeeCountUpdate(int newCount);
        void SimulateVolunteerCountUpdate(int newCount);
    }
}
