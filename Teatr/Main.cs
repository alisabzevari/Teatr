using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
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
            var movieRelatedExtensions = new[] { ".avi", ".wmv", ".mpeg", ".mp4", ".mkv", ".srt", ".sub" };

            foreach (var movieFolder in Program.Settings.MovieFolders)
            {
                if (!Directory.Exists(movieFolder))
                    continue;
                var files = new DirectoryInfo(movieFolder).GetFiles();
                foreach (var fileInfo in files)
                {
                    if (movieRelatedExtensions.Contains(fileInfo.Extension))
                    {
                        var targetDir = Path.Combine(fileInfo.DirectoryName, fileInfo.Name.Replace(fileInfo.Extension, ""));
                        if (!Directory.Exists(targetDir))
                        {
                            Directory.CreateDirectory(targetDir);
                        }
                        fileInfo.MoveTo(Path.Combine(targetDir, fileInfo.Name));
                    }
                }
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
                var item = new ListViewItem(new[] { "", "", "", "", path });
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

        private void mnuCopy_Click(object sender, EventArgs e)
        {
            Shell32.Shell shell = new Shell32.Shell();
            if (dlgFolders.ShowDialog() == DialogResult.OK)
            {
                foreach (ListViewItem selectedItem in lstMovies.SelectedItems)
                {
                    var source = shell.NameSpace(selectedItem.SubItems[4].Text);
                    var destination = shell.NameSpace(dlgFolders.SelectedPath);
                    destination.CopyHere(source, 0);

                    //    var targetDir = Path.Combine(dlgFolders.SelectedPath, Path.GetFileName(selectedItem.SubItems[4].Text));
                    //DirectoryCopy(selectedItem.SubItems[4].Text, targetDir, true);
                }
            }
        }

        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
        {
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);
            DirectoryInfo[] dirs = dir.GetDirectories();

            // If the source directory does not exist, throw an exception.
            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }

            // If the destination directory does not exist, create it.
            if (!Directory.Exists(destDirName))
            {
                Directory.CreateDirectory(destDirName);
            }


            // Get the file contents of the directory to copy.
            FileInfo[] files = dir.GetFiles();

            foreach (FileInfo file in files)
            {
                // Create the path to the new copy of the file.
                string temppath = Path.Combine(destDirName, file.Name);

                // Copy the file.
                file.CopyTo(temppath, false);
            }

            // If copySubDirs is true, copy the subdirectories.
            if (copySubDirs)
            {

                foreach (DirectoryInfo subdir in dirs)
                {
                    // Create the subdirectory.
                    string temppath = Path.Combine(destDirName, subdir.Name);

                    // Copy the subdirectories.
                    DirectoryCopy(subdir.FullName, temppath, copySubDirs);
                }
            }
        }
    }
}
