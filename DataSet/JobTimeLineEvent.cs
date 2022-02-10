namespace ResumeBuilder.DataSet
{
    public class JobTimeLineEvent : BasicTimeLineEvent
    {
        public override TimeLineEventTypes EventType => TimeLineEventTypes.Job;

        public string Title { get; set; }
        public List<string> Responsibilities { get; set; }
        public Dictionary<String, string> Disciplines { get; set; }
    }
}
