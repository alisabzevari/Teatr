using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;
using Teatr.OmdbClient;

namespace Teatr
{
    public partial class Main : Form
    {
        private readonly MovieDiscovery.MovieDiscovery _movieDiscovery = new MovieDiscovery.MovieDiscovery();

        public Main()
        {
            InitializeComponent();
        }

        private void mnuOpenFolder_Click(object sender, EventArgs e)
        {
            if (dlgFolders.ShowDialog() == DialogResult.OK)
            {
                DiscoverMovies(dlgFolders.SelectedPath);
            }
        }

        private void DiscoverMovies(string path)
        {
            var subFolders = new DirectoryInfo(path).EnumerateDirectories().ToList();
            status.Text = "Discovering movies...";
            progress.Visible = true;
            progress.Maximum = subFolders.Count();
            foreach (var folder in subFolders)
            {
                var item = new ListViewItem(new[] { "Discovering...", "", "", folder.FullName });
                lstMovies.Items.Add(item);
                Task.Factory.StartNew(() =>
                    {
                        var movieInfoPath = Path.Combine(folder.FullName, "MovieInfo.json");
                        OmdbMovie movie;
                        if (!File.Exists(movieInfoPath))
                        {
                            movie = _movieDiscovery.DiscoverMovie(folder.Name);
                            if (movie != null)
                                File.WriteAllText(movieInfoPath, JsonConvert.SerializeObject(movie, Formatting.Indented));
                        }
                        else
                            movie = JsonConvert.DeserializeObject<OmdbMovie>(File.ReadAllText(movieInfoPath));

                        this.Invoke((MethodInvoker)(() =>
                        {
                            if (movie != null)
                            {
                                item.SubItems[0].Text = movie.Title;
                                item.SubItems[1].Text = movie.Year.ToString();
                                item.SubItems[2].Text = string.Join(", ", movie.Genre);
                                item.Tag = movie;
                            }
                            else
                            {
                                item.SubItems[0].Text = "Not Found";
                                item.BackColor = Color.Red;
                            }
                            progress.PerformStep();
                            if (progress.Value == progress.Maximum - 1)
                            {
                                status.Text = "Ready";
                                progress.Visible = false;
                            }
                        }));
                    });
            }
        }

        private void lstMovies_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lstMovies.SelectedItems.Count > 0)
                propertyGrid.SelectedObject = lstMovies.SelectedItems[0].Tag;
        }
    }
}
