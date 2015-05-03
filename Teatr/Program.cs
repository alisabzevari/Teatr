using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using TMDbLib.Client;

namespace Teatr
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            TMDbClient client = new TMDbClient("APIKey");
            var result = client.SearchMovie("007");
            //Application.Run(new Form1());
        }
    }
}
