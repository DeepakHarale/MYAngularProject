namespace ATDMSAPI.BussinessLogic.Helpers
{
    public static class NullableExtension
    {
        public static long GetValueOrDefault(this long? Id)
        {
            if (Id.HasValue)
                return Id.Value;
            return 0;
        }
    }
}