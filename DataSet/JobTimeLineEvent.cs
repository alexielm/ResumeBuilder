namespace ResumeBuilder.DataSet
{
    public class JobTimeLineEvent : BasicTimeLineEvent
    {
        public override TimeLineEventTypes EventType => TimeLineEventTypes.Job;

        public List<JobCareer> Career { get; set; }

    }
}
