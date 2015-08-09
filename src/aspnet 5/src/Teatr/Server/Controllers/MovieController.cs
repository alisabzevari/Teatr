using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Configuration;

namespace Teatr.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private readonly Options _options;

        public TestController(Options options)
        {
            _options = options;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return this.Json(new { FirstName = "Ali", Age = 31 });
        }
    }
}
