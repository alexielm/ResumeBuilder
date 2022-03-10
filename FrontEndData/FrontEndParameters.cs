namespace ResumeBuilder.FrontEndData
{
    public class FrontEndParameters
    {
        public const string SectionName = "frontEndParameters";

        public bool ShowYearsOfExperience { get; set; }
        public string WorkExperienceViewType { get; set; }
        public bool SkillTrend { get; set; }
        public List<SkillType> SkillTypes { get; set; }
    }
}
