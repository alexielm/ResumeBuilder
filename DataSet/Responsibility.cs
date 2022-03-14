namespace ResumeBuilder.DataSet
{
    public class Responsibility
    {
        public string Description { get; set; }
        public List<SpecialLink> SpecialLinks { get; set; } = new List<SpecialLink>();
        public List<string> Disciplines { get; set; } = new List<string>();
    }
}