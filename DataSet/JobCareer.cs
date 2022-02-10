namespace ResumeBuilder.DataSet
{
    public class JobCareer
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public List<string> Responsibilities { get; set; }
        public Dictionary<String, string> Disciplines { get; set; }
    }
}
