using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ResumeBuilder.GeneralUtils;

namespace ResumeBuilder.DataSet
{
    public class TimeLineEventConverter : JsonConverter<GenericTimeLineEvent>
    {
        public override GenericTimeLineEvent? ReadJson(JsonReader reader, Type objectType, GenericTimeLineEvent? existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var Object = JObject.ReadFrom(reader);
            return (GenericTimeLineEvent)Object.ToObject(Function.Evaluate(() =>
            {
                switch (Enum.Parse<GenericTimeLineEvent.TimeLineEventTypes>(Object.Value<string>("eventType")))
                {
                    case GenericTimeLineEvent.TimeLineEventTypes.Job: return typeof(JobTimeLineEvent);
                    case GenericTimeLineEvent.TimeLineEventTypes.Hobby: return typeof(HobbyTimeLineEvent);
                    case GenericTimeLineEvent.TimeLineEventTypes.Education: return typeof(EducationTimeLineEvent);
                    default: return typeof(GenericTimeLineEvent);
                }
            }));
        }

        public override void WriteJson(JsonWriter writer, GenericTimeLineEvent? value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
