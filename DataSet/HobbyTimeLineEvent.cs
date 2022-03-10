namespace ResumeBuilder.DataSet
{
    public class HobbyTimeLineEvent : GenericTimeLineEvent
    {
        public override TimeLineEventTypes EventType => TimeLineEventTypes.Hobby;

        public string Title { get; set; }

        public List<string> Remarks { get; set; } = new List<string>();
        public List<string> Disciplines { get; set; } = new List<string>();
    }
}
