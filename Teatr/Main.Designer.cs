namespace Teatr
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.lstMovies = new System.Windows.Forms.ListView();
            this.colTitle = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.colYear = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.colGenre = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuOpenFolder = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuSync = new System.Windows.Forms.ToolStripMenuItem();
            this.dlgFolders = new System.Windows.Forms.FolderBrowserDialog();
            this.colPath = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.status = new System.Windows.Forms.ToolStripStatusLabel();
            this.progress = new System.Windows.Forms.ToolStripProgressBar();
            this.tableLayoutPanel1.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.statusStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 80F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.Controls.Add(this.lstMovies, 0, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 24);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 1;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(929, 486);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // lstMovies
            // 
            this.lstMovies.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.colTitle,
            this.colYear,
            this.colGenre,
            this.colPath});
            this.lstMovies.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lstMovies.FullRowSelect = true;
            this.lstMovies.GridLines = true;
            this.lstMovies.Location = new System.Drawing.Point(3, 3);
            this.lstMovies.Name = "lstMovies";
            this.lstMovies.Size = new System.Drawing.Size(737, 480);
            this.lstMovies.TabIndex = 0;
            this.lstMovies.UseCompatibleStateImageBehavior = false;
            this.lstMovies.View = System.Windows.Forms.View.Details;
            // 
            // colTitle
            // 
            this.colTitle.Text = "Title";
            this.colTitle.Width = 258;
            // 
            // colYear
            // 
            this.colYear.Text = "Year";
            // 
            // colGenre
            // 
            this.colGenre.Text = "Genre";
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(929, 24);
            this.menuStrip1.TabIndex = 1;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuOpenFolder,
            this.mnuSync});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // mnuOpenFolder
            // 
            this.mnuOpenFolder.Name = "mnuOpenFolder";
            this.mnuOpenFolder.Size = new System.Drawing.Size(152, 22);
            this.mnuOpenFolder.Text = "Open Folder";
            this.mnuOpenFolder.Click += new System.EventHandler(this.mnuOpenFolder_Click);
            // 
            // mnuSync
            // 
            this.mnuSync.Name = "mnuSync";
            this.mnuSync.Size = new System.Drawing.Size(152, 22);
            this.mnuSync.Text = "Sync";
            // 
            // colPath
            // 
            this.colPath.Text = "Path";
            this.colPath.Width = 350;
            // 
            // statusStrip1
            // 
            this.statusStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.status,
            this.progress});
            this.statusStrip1.Location = new System.Drawing.Point(0, 510);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Size = new System.Drawing.Size(929, 22);
            this.statusStrip1.TabIndex = 2;
            this.statusStrip1.Text = "statusStrip1";
            // 
            // status
            // 
            this.status.Name = "status";
            this.status.Size = new System.Drawing.Size(39, 17);
            this.status.Text = "Ready";
            // 
            // progress
            // 
            this.progress.Name = "progress";
            this.progress.Size = new System.Drawing.Size(100, 16);
            this.progress.Step = 1;
            this.progress.Visible = false;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(929, 532);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Controls.Add(this.statusStrip1);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Main";
            this.Text = "Main";
            this.tableLayoutPanel1.ResumeLayout(false);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.statusStrip1.ResumeLayout(false);
            this.statusStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.ListView lstMovies;
        private System.Windows.Forms.ColumnHeader colTitle;
        private System.Windows.Forms.ColumnHeader colYear;
        private System.Windows.Forms.ColumnHeader colGenre;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem mnuOpenFolder;
        private System.Windows.Forms.ToolStripMenuItem mnuSync;
        private System.Windows.Forms.FolderBrowserDialog dlgFolders;
        private System.Windows.Forms.ColumnHeader colPath;
        private System.Windows.Forms.StatusStrip statusStrip1;
        private System.Windows.Forms.ToolStripStatusLabel status;
        private System.Windows.Forms.ToolStripProgressBar progress;
    }
}