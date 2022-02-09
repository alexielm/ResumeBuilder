using Newtonsoft.Json;
using System.Reflection;

namespace ResumeBuilder.DataSet
{
    public class ResumeData
    {
        public static ResumeData Load()
        {
            //serializer.Converters.Add(new IdentityProviderConverter());

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var resumeDataString = File.ReadAllText(path + "\\DataFile\\ResumeData.json");
            return JsonConvert.DeserializeObject<ResumeData>(resumeDataString, new JsonConverter[] { new TimelineEventConverter() });
        }


        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ContactData Contact { get; set; }
        public List<BasicTimeLineEvent> Timeline { get; set; }
    }
}
