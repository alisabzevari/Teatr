using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teatr
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var contents = File.ReadAllLines("a.txt");
            var discovery = new MovieDiscovery.MovieDiscovery();
            foreach (var content in contents)
            {
                var c = content.Trim();
                var movie = discovery.DiscoverMovie(c);
                if (movie == null)
                    Console.WriteLine(c + " : Not Found");
                else
                    Console.WriteLine(c + " : " + movie);
            }
            Console.ReadKey();
        }
    }
}
