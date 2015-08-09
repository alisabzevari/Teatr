using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
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

        private void lstMovies_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lstMovies.SelectedItems.Count > 0)
                propertyGrid.SelectedObject = lstMovies.SelectedItems[0].Tag;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            foreach (var movieFolder in Program.Settings.MovieFolders)
            {
                if (!Directory.Exists(movieFolder))
                    continue;
                var dirs = new DirectoryInfo(movieFolder).EnumerateDirectories();
                foreach (var dir in dirs)
                {
                    var movieInfoPath = Path.Combine(dir.FullName, "MovieInfo.json");
                    if (File.Exists(movieInfoPath))
                    {
                        var movieInfo = JsonConvert.DeserializeObject<OmdbMovie>(File.ReadAllText(movieInfoPath));
                        lstMovies.Items.Add(CreateLstItemFrom(dir.FullName, movieInfo));
                    }
                    else
                    {
                        lstMovies.Items.Add(CreateLstItemFrom(dir.FullName));
                    }
                }
            }
        }

        private void mnuDiscover_Click(object sender, EventArgs e)
        {
            DiscoverMovies();
        }

        private ListViewItem CreateLstItemFrom(string path, OmdbMovie movieInfo = null)
        {
            if (movieInfo == null)
            {
                var item = new ListViewItem(new[] {"", "", "", "", path});
                return item;
            }
            else
            {
                var item = new ListViewItem(new[] { movieInfo.Title, movieInfo.Year.ToString(), movieInfo.ImdbRating.ToString(), string.Join(", ", movieInfo.Genre), path });
                item.Tag = movieInfo;
                return item;
            }
        }
        private void DiscoverMovies()
        {
            var items = new Dictionary<DirectoryInfo, ListViewItem>();
            foreach (ListViewItem item in lstMovies.Items)
            {
                if (item.Tag == null)
                {
                    items.Add(new DirectoryInfo(item.SubItems[4].Text), item);
                }
            }
            status.Text = "Discovering movies...";
            progress.Visible = true;
            progress.Minimum = 0;
            progress.Maximum = items.Count();
            progress.Value = 0;
            foreach (var item in items)
            {
                item.Value.SubItems[0].Text = "Discovering...";
                item.Value.BackColor = Color.Yellow;
                Task.Factory.StartNew(() =>
                {
                    var movieInfoPath = Path.Combine(item.Key.FullName, "MovieInfo.json");
                    OmdbMovie movie;
                    movie = _movieDiscovery.DiscoverMovie(item.Key.Name);
                    if (movie != null)
                        File.WriteAllText(movieInfoPath, JsonConvert.SerializeObject(movie, Formatting.Indented));

                    this.Invoke((MethodInvoker)(() =>
                    {
                        if (movie != null)
                        {
                            item.Value.SubItems[0].Text = movie.Title;
                            item.Value.SubItems[1].Text = movie.Year.ToString();
                            item.Value.SubItems[2].Text = movie.ImdbRating.ToString();
                            item.Value.SubItems[3].Text = string.Join(", ", movie.Genre);
                            item.Value.Tag = movie;
                            item.Value.BackColor = DefaultBackColor;
                        }
                        else
                        {
                            item.Value.SubItems[0].Text = "Not Found";
                            item.Value.BackColor = Color.Tomato;
                        }
                        progress.PerformStep();
                        if (progress.Value >= progress.Maximum)
                        {
                            status.Text = "Ready";
                            progress.Visible = false;
                        }
                    }));
                });
            }
        }

        private void openInExplorerToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (lstMovies.SelectedItems.Count > 0)
            {
                Process.Start(lstMovies.SelectedItems[0].SubItems[4].Text);
            }
        }
    }
}
