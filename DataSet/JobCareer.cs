namespace ResumeBuilder.DataSet
{
    public class JobCareer
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public List<Responsibility> Responsibilities { get; set; }
        public List<string> OtherDisciplines { get; set; } = new List<string>();
    }
}
