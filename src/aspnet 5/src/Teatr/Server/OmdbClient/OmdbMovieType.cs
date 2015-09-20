using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Teatr.OmdbClient
{
    [Flags]
    public enum OmdbMovieType
    {
        Movie,
        Series,
        Episode
    }
}
