namespace ResumeBuilder.DataSet
{
    public class JobCareer
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public List<Responsibility> Responsibilities { get; set; }
        public Dictionary<string, string> DisciplinesSet { get; set; } = new Dictionary<string, string>();
    }
}
