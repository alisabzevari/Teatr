using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Configuration;
using System.IO;
using Teatr.OmdbClient;
using Newtonsoft.Json;
using System.Diagnostics;

namespace Teatr.Controllers
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly Options _options;

        public MovieController(Options options)
        {
            _options = options;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = new List<OmdbMovie>();
            foreach (var movieFolder in _options.SearchPaths)
            {
                if (!Directory.Exists(movieFolder))
                    continue;
                var dirs = new DirectoryInfo(movieFolder).EnumerateDirectories();
                foreach (var dir in dirs)
                {
                    var movieInfoPath = Path.Combine(dir.FullName, "MovieInfo.json");
                    if (System.IO.File.Exists(movieInfoPath))
                    {
                        var movieInfo = JsonConvert.DeserializeObject<OmdbMovie>(System.IO.File.ReadAllText(movieInfoPath));
                        movieInfo.FolderAddress = Path.GetDirectoryName(movieInfoPath);
                        result.Add(movieInfo);
                    }
                }
            }
            return Json(result);
        }

        [Route("[action]")]
        public void Explore(string movieFolderAddress)
        {
            Process.Start(movieFolderAddress);
        }
    }
}
