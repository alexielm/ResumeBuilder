namespace ResumeBuilder.DataSet
{
    public class JobTimeLineEvent : BasicTimeLineEvent
    {
        public override TimeLineEventTypes EventType => TimeLineEventTypes.Job;

        public List<string> Remarks { get; set; } = new List<string>();

        public List<JobCareer> Career { get; set; } = new List<JobCareer>();

    }
}
