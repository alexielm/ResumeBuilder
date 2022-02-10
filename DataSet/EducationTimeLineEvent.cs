namespace ResumeBuilder.DataSet
{
    public class EducationTimeLineEvent : BasicTimeLineEvent
    {
        public override TimeLineEventTypes EventType => TimeLineEventTypes.Education;

        public string Program { get; set; }
        public string Description { get; set; }
    }
}
