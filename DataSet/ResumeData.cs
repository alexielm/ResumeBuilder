using Newtonsoft.Json;
using System.Reflection;

namespace ResumeBuilder.DataSet
{
    public class ResumeData
    {
        private static string resumeDataString()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
#if (DEBUG)
            return File.ReadAllText(path + "\\..\\..\\..\\DataFile\\ResumeData.json");
#else
            return File.ReadAllText(path + "\\DataFile\\ResumeData.json");
#endif
        }
        public static ResumeData Load()
        {
            return JsonConvert.DeserializeObject<ResumeData>(resumeDataString(), new JsonConverter[] { new TimeLineEventConverter() });
        }

        public void Refresh()
        {
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.Converters.Add(new TimeLineEventConverter());
            Remarks?.Clear();
            SkillsLevelTimeProgress?.Clear();
            TimeLine?.Clear();
            References?.Clear();
            JsonConvert.PopulateObject(resumeDataString(), this, serializerSettings);
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ContactData Contact { get; set; }
        public List<string> Remarks { get; set; }
        public List<Dictionary<string, int?>> SkillsLevelTimeProgress { get; set; } 
        public List<GenericTimeLineEvent> TimeLine { get; set; }
        public Dictionary<string, ReferencesItem> References { get; set; }
    }
}
