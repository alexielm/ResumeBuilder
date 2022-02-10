using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ResumeBuilder.GeneralUtils;

namespace ResumeBuilder.DataSet
{
    public class TimelineEventConverter : JsonConverter<BasicTimeLineEvent>
    {
        public override BasicTimeLineEvent? ReadJson(JsonReader reader, Type objectType, BasicTimeLineEvent? existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var Object = JObject.ReadFrom(reader);
            return (BasicTimeLineEvent)Object.ToObject(Function.Evaluate(() =>
            {
                switch (Enum.Parse<BasicTimeLineEvent.TimeLineEventTypes>(Object.Value<string>("eventType")))
                {
                    case BasicTimeLineEvent.TimeLineEventTypes.Job: return typeof(JobTimeLineEvent);
                    case BasicTimeLineEvent.TimeLineEventTypes.Education: return typeof(EducationTimeLineEvent);
                    default: return typeof(BasicTimeLineEvent);
                }
            }));
        }

        public override void WriteJson(JsonWriter writer, BasicTimeLineEvent? value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
