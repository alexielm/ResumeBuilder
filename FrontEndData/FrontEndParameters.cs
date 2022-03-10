namespace ResumeBuilder.FrontEndData
{
    public class FrontEndParameters
    {
        public const string SectionName = "frontEndParameters";

        public bool ShowYearsOfExperience { get; set; }

        public bool SkillPriorityView { get; set; }
        public List<SkillType> SkillTypes { get; set; }
    }
}
