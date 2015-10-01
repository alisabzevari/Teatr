using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Teatr.OmdbClient;

namespace Teatr.Server
{
    public class DirectoryDiscovery
    {
        private readonly string _directory;
        public DirectoryDiscovery(string directory)
        {
            _directory = directory;
        }

        public IList<OmdbMovie> GetDiscoveredMovies() {
            throw new NotImplementedException();
        }
    }
}
