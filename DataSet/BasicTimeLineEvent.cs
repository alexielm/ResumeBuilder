using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ResumeBuilder.DataSet
{
    public abstract class BasicTimeLineEvent : GenericTimeLineEvent
    {
        public string Institution { get; set; }
        public string Location { get; set; }
        public string Web { get; set; }
    }
}
