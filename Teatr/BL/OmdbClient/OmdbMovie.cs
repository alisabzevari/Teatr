using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teatr.OmdbClient
{
    public class OmdbMovie
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Rated { get; set; }
        public DateTime Released { get; set; }
        public string Runtime { get; set; }
        public IEnumerable<string> Genre { get; set; }
        public string Director { get; set; }
        public string Writer { get; set; }
        public IEnumerable<string> Actors { get; set; }
        public string Plot { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }
        public string Awards { get; set; }
        public Uri Poster { get; set; }
        public int Metascore { get; set; }
        public float ImdbRating { get; set; }
        public int ImdbVotes { get; set; }
        public string ImdbId { get; set; }
        public OmdbMovieType Type { get; set; }
    }
}
