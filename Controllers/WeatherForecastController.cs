using Microsoft.AspNetCore.Mvc;
using ResumeBuilder.DataSet;

namespace ResumeBuilder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ResumeData _resumeData;
        private readonly SkillTypes _skillTypes;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ResumeData resumeData, SkillTypes skillTypes)
        {
            _logger = logger;
            _resumeData = resumeData;
            _skillTypes = skillTypes;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}