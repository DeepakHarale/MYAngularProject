using System;

[assembly: log4net.Config.XmlConfigurator(ConfigFile = "log4net.config", Watch = true)]

namespace ATDMSAPI.BussinessLogic.Helpers
{
    public class InstitutionWebLogs
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(typeof(InstitutionWebLogs));

        public static void Error(object msg)
        {
            Log.Error(msg);
        }

        public static void Error(object msg, Exception ex)
        {
            Log.Error(msg, ex);
        }

        public static void Error(Exception ex)
        {
            Log.Error(ex.Message, ex);
        }

        public static void Info(object msg)
        {
            Log.Info(msg);
        }

        public static void WriteLine()
        {
            Log.Error("------------------------------------------------------------------------------------------------------------");
        }

        public static void Warn(object msg)
        {
            Log.Warn(msg);
        }
    }
}