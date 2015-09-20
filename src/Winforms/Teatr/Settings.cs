using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Teatr
{
    public class Settings
    {
        [JsonIgnore]
        public string Filename { get; private set; }

        public List<string> MovieFolders { get; set; }

        public Settings()
        {
            MovieFolders = new List<string>();
        }

        public static Settings LoadFromFile(string filename)
        {
            var settings = JsonConvert.DeserializeObject<Settings>(File.ReadAllText(filename));
            settings.Filename = filename;
            return settings;
        }

        public void SaveChanges()
        {
            File.WriteAllText(Filename, JsonConvert.SerializeObject(this));
        }

    }
}
