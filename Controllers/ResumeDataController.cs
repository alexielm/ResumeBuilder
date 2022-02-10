using Microsoft.AspNetCore.Mvc;
using ResumeBuilder.DataSet;
using ResumeBuilder.FrontEndData;

namespace ResumeBuilder.Controllers
{
    [ApiController]
    public class ResumeDataController : Controller
    {
        private readonly ILogger<ResumeDataController> _logger;
        private readonly ResumeData _resumeData;
        private readonly FrontEndParameters _frontEndParameters;

        public ResumeDataController(ILogger<ResumeDataController> logger, ResumeData resumeData, FrontEndParameters frontEndParameters)
        {
            _logger = logger;
            _resumeData = resumeData;
            _frontEndParameters = frontEndParameters;
        }

        [HttpGet]
        [Route("api/testing")]
        public object URLTest()
        {
            return Ok($"+RX - ResumeBuilder - {DateTime.Now}");
        }

        [HttpGet]
        [Route("api/resumeData")]
        public object ResumeData()
        {
            return Ok(_resumeData);
        }

        [HttpGet]
        [Route("api/frontEndParameters")]
        public object FrontEndParameters()
        {
            return Ok(_frontEndParameters);
        }
    }
}
