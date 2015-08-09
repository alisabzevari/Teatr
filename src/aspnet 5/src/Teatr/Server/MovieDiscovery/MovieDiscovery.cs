using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Teatr.OmdbClient;
using System.Net.Http;

namespace Teatr.MovieDiscovery
{
    public class MovieDiscovery
    {
        //private readonly string _googleApiBaseUrl = "https://ajax.googleapis.com/ajax/services/search/web?v=1.0&userip={0}&q=imdb {1}";

        private readonly string[] _replacables =
        {
            "scoop",
            "webdl",
            "brrip",
            "mkv",
            "yify",
            "paroos",
            "blueray",
            "720p",
            "dvdrip",
            "fxg",
            "eng",
            "far",
            "axxo",
            "xvid",
            "divx",
            "nedivx",
            "-",
            "klaxxon",
            "zektorm",
            "fxm",
            "1080p",
            "dvdrip",
            "psig",
            "hdmicro",
            "kickass",
            "brrip",
            "x264",
            "_",
            "noscr",
            "jns",
            ".",
            "[",
            "]",
            "(",
            ")"
        };

        private readonly OmdbClient.OmdbClient _client = new OmdbClient.OmdbClient();

        public async Task DiscoverMoviesInDirectoryAsync(DirectoryInfo dir)
        {
            foreach (var directory in dir.EnumerateDirectories())
            {
                var movieInfoPath = Path.Combine(directory.FullName, "MovieInfo.json");
                if (!File.Exists(movieInfoPath))
                {
                    var movieInfo = await DiscoverMovieAsync(directory.Name);
                    if (movieInfo != null)
                    {
                        File.WriteAllText(movieInfoPath, JsonConvert.SerializeObject(movieInfo, Formatting.Indented));
                    }
                }
            }
        }

        public async Task<OmdbMovie> DiscoverMovieAsync(string query)
        {
            var urlStr = await GetImDbUrlAsync(CleanTitle(query));
            if (string.IsNullOrEmpty(urlStr))
                return null;
            var url = new Uri(urlStr);
            return await _client.GetMovieDetailsAsync(url.Segments.Last().Replace("/", ""));
        }

        private string CleanTitle(string dirtyTitle)
        {
            var res = new StringBuilder(dirtyTitle.ToLower());
            foreach (var replacable in _replacables)
            {
                res.Replace(replacable, " ");
            }
            return res.ToString();
        }

        private const string GoogleSearch = "http://www.google.com/search?q=imdb+";
        private const string BingSearch = "http://www.bing.com/search?q=imdb+";
        
        private async Task<string> GetImDbUrlAsync(string movieName, string searchEngine = "google")
        {
            string url = GoogleSearch + movieName; //default to Google search
            if (searchEngine.ToLower().Equals("bing")) url = BingSearch + movieName;
            //if (searchEngine.ToLower().Equals("ask")) url = AskSearch + MovieName; 
            string html = await GetUrlDataAsync(url);
            ArrayList imdbUrls = matchAll(@"http://www.imdb.com/title/tt\d{7}/", html);
            if (imdbUrls.Count > 0)
                return (string)imdbUrls[0]; //return first IMDb result
            else if (searchEngine.ToLower().Equals("google")) //if Google search fails
                return await GetImDbUrlAsync(movieName, "bing"); //search using Bing
            //else if (searchEngine.ToLower().Equals("bing")) //if Bing search fails
            //    return GetIMDbUrl(MovieName, "ask"); //search using Ask
            else //search fails
                return string.Empty;
        }

        private async Task<string> GetUrlDataAsync(string url)
        {
            var client = new HttpClient();
            var r = new Random();
            //Random IP Address
            client.DefaultRequestHeaders.Add("X-Forwarded-For", r.Next(0, 255) + "." + r.Next(0, 255) + "." + r.Next(0, 255) + "." + r.Next(0, 255));
            //Random User-Agent
            client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/" + r.Next(3, 5) + ".0 (Windows NT " + r.Next(3, 5) + "." + r.Next(0, 2) + "; rv:2.0.1) Gecko/20100101 Firefox/" + r.Next(3, 5) + "." + r.Next(0, 5) + "." + r.Next(0, 5));
            Stream datastream = await client.GetStreamAsync(url);
            var reader = new StreamReader(datastream);
            return reader.ReadToEnd();
        }

        private ArrayList matchAll(string regex, string html, int i = 0)
        {
            var list = new ArrayList();
            foreach (Match m in new Regex(regex, RegexOptions.Multiline).Matches(html))
                list.Add(m.Groups[i].Value.Trim());
            return list;
        }

        //public OmdbMovie SimilaritySearch(string query)
        //{
        //    //return GetMovieDetails(GetImdbIdFromGoogleApi(query));
        //    var movie = Search(query).FirstOrDefault();
        //    if (movie == null)
        //        return null;
        //    return GetMovieDetails(movie.ImdbId);
        //}

        //private string GetLocalIpAddress()
        //{
        //    IPHostEntry host;
        //    string localIP = "?";
        //    host = Dns.GetHostEntry(Dns.GetHostName());
        //    foreach (IPAddress ip in host.AddressList)
        //    {
        //        if (ip.AddressFamily.ToString() == "InterNetwork")
        //        {
        //            localIP = ip.ToString();
        //        }
        //    }
        //    return localIP;
        //}

        //private string GetImdbIdFromGoogleApi(string query)
        //{
        //    var webClient = new WebClient();
        //    dynamic result = JObject.Parse(webClient.DownloadString(string.Format(googleApiBaseUrl, GetLocalIpAddress(), query)));
        //    try
        //    {
        //        Uri firstResultUri = new Uri(result.responseData.results[0].url.ToString());
        //        if (firstResultUri.Host.Contains("www.imdb.com"))
        //        {
        //            return firstResultUri.Segments.Last().Replace("/", "");
        //        }
        //        return null;
        //    }
        //    catch { }
        //    return null;
        //}

    }
}
