using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Teatr.Test
{
    public class Test1
    {
        [Fact]
        public void TestWithNoResult()
        {
            var omdb = new Teatr.OmdbClient.OmdbClient();
            var result = omdb.Search("AnimalKingdom");
            Assert.True(!result.Any());
        }

        [Fact]
        public void TestWithMultipleResults()
        {
            var omdb = new Teatr.OmdbClient.OmdbClient();
            var result = omdb.Search("Animal Kingdom");
            Assert.True(result.Any());

        }

        [Fact]
        public void TestMovieDetails()
        {
            var omdb = new Teatr.OmdbClient.OmdbClient();
            var result = omdb.GetMovieDetails("tt1313092");
            Assert.NotNull(result);
        }

        //[Fact]
        //public void TestSimilaritySearch()
        //{
        //    var omdb = new Teatr.OmdbClient.OmdbClient();
        //    var result = omdb.SimilaritySearch("Cinderella Man (2005)");
        //    Assert.Equal("tt0352248", result.ImdbId);
        //}

    }
}
