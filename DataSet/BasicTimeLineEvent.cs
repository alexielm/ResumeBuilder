using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ResumeBuilder.DataSet
{
    public abstract class BasicTimeLineEvent
    {
        public enum TimeLineEventTypes { Job, Education }

        [JsonConverter(typeof(StringEnumConverter))]
        public abstract TimeLineEventTypes EventType { get; }   

        public string Institution { get; set; }
        public string Location { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
