namespace ResumeBuilder.DataSet
{
    public class EducationTimeLineEvent : BasicTimeLineEvent
    {
        public override TimeLineEventTypes EventType => TimeLineEventTypes.Education;

        public string Program { get; set; }
        public List<string> Achievements { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
