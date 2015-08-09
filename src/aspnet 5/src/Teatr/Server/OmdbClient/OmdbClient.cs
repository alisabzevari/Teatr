using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Teatr.OmdbClient
{
    public class OmdbClient
    {
        private readonly string baseUrl = "http://www.omdbapi.com/?";

        public async Task<IEnumerable<OmdbMovie>> SearchAsync(string query, OmdbMovieType? movieType = null, int? year = null)
        {
            var uri = new StringBuilder(baseUrl);
            uri.Append("s=" + query);
            if (movieType != null)
                uri.Append("&type=" + movieType.ToString().ToLower());
            if (year != null)
                uri.Append("&y=" + year);
            uri.Append("&r=json");

            var httpClient = new HttpClient();
            var resultStr = await httpClient.GetStringAsync(uri.ToString());
            dynamic result = JObject.Parse(resultStr);
            var returnValue = new List<OmdbMovie>();
            try
            {
                returnValue = JsonConvert.DeserializeObject<IEnumerable<OmdbMovie>>(result.Search.ToString());
            }
            catch { }
            return returnValue;
        }

        public async Task<OmdbMovie> GetMovieDetailsAsync(string imdbId)
        {
            var uri = new StringBuilder(baseUrl);
            uri.Append("i=" + imdbId);

            var httpClient = new HttpClient();
            var resultStr = await httpClient.GetStringAsync(uri.ToString());
            dynamic result = JObject.Parse(resultStr);
            try
            {
                var returnValue = new OmdbMovie()
                {
                    Actors = ((string)result.Actors.ToString()).Split(',').Select(s => s.Trim()).ToArray(),
                    Awards = result.Awards,
                    Country = result.Country,
                    Genre = ((string)result.Genre.ToString()).Split(',').Select(s => s.Trim()).ToArray(),
                    Director = result.Director,
                    ImdbId = result.imdbID,
                    ImdbRating = result.imdbRating,
                    ImdbVotes = int.Parse(result.imdbVotes.ToString(), NumberStyles.AllowThousands),
                    Language = result.Language,
                    Metascore = result.Metascore,
                    Plot = result.Plot,
                    Poster = new Uri(result.Poster.ToString()),
                    Rated = result.Rated,
                    Released = result.Released,
                    Runtime = result.Runtime,
                    Title = result.Title,
                    Type = result.Type,
                    Writer = result.Writer,
                    Year = result.Year
                };
                return returnValue;
            }
            catch { }
            return null;
        }

    }
}
