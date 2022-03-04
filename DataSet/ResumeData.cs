using Newtonsoft.Json;
using System.Reflection;

namespace ResumeBuilder.DataSet
{
    public class ResumeData
    {
        private static string resumeDataString()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            return File.ReadAllText(path + "\\..\\..\\..\\DataFile\\ResumeData.json");
        }
        public static ResumeData Load()
        {
            return JsonConvert.DeserializeObject<ResumeData>(resumeDataString(), new JsonConverter[] { new TimeLineEventConverter() });
        }

        public void Refresh()
        {
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.Converters.Add(new TimeLineEventConverter());
            Remarks.Clear();
            TimeLine.Clear();
            References.Clear();
            JsonConvert.PopulateObject(resumeDataString(), this, serializerSettings);
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ContactData Contact { get; set; }
        public List<string> Remarks { get; set; }
        public List<BasicTimeLineEvent> TimeLine { get; set; }
        public Dictionary<string, ReferencesItem> References { get; set; }
    }
}
