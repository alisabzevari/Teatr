using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teatr.OmdbClient
{
    public class OmdbMovie
    {
        internal OmdbMovie() { }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Rated { get; set; }
        public DateTime Released { get; set; }
        public string Runtime { get; set; }
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        [Editor("System.Windows.Forms.Design.StringArrayEditor, System.Design, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a", typeof(UITypeEditor))]
        public string[] Genre { get; set; }
        public string Director { get; set; }
        public string Writer { get; set; }
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content)]
        [Editor("System.Windows.Forms.Design.StringArrayEditor, System.Design, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a", typeof(UITypeEditor))]
        public string[] Actors { get; set; }
        public string Plot { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }
        public string Awards { get; set; }
        public Uri Poster { get; set; }
        public string Metascore { get; set; }
        public float ImdbRating { get; set; }
        public int ImdbVotes { get; set; }
        public string ImdbId { get; set; }
        public OmdbMovieType Type { get; set; }

        public override string ToString()
        {
            return Title + " - " + Year;
        }
    }
}
