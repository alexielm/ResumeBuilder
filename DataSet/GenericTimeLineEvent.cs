using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ResumeBuilder.DataSet
{
    public abstract class GenericTimeLineEvent
    {
        public enum TimeLineEventTypes { Job, Hobby, Education }

        [JsonConverter(typeof(StringEnumConverter))]
        public abstract TimeLineEventTypes EventType { get; }   
    }
}
