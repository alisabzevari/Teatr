using System;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Teatr
{
    public class Program
    {
        public static Settings Settings;

        [STAThread]
        public static void Main(string[] args)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            if (File.Exists("settings.json"))
                Settings = Settings.LoadFromFile("Settings.json");
            else
                Settings = new Settings();
            Application.Run(new Main());
        }
    }
}
