import {SettingsProvider} from "../core/SettingsProvider";
// import {MovieDiscovery} from "../../Core/MovieDiscovery";
import {autoinject} from "aurelia-framework";
import {} from "materialize";

@autoinject()
export class Manage {
    public movieFoldersStatus: MovieFolderStatus[];
    public selectedFolder: Entry;

    constructor(public settings: SettingsProvider,
    ) {
        this.settings.load()
            .then(() => {
                this.movieFoldersStatus = settings.movieFolders.map(mf => ({
                    entry: mf.entry,
                    active: mf.active,
                    discovering: 0,
                    discoveredCount: 0,   //movieDiscovery.getDiscoveredMoviesInFolder(mf.path),
                    unDiscoveredCount: 0  //movieDiscovery.getUnDiscoveredMoviesInFolder(mf.path),
                }));
            })
    }

    saveChanges() {
        this.settings.movieFolders = this.movieFoldersStatus.map(s => ({ active: s.active, entry: s.entry }));
        this.settings.saveChanges()
            .then(() => Materialize.toast("Settings Saved", 500))
            .catch(err => {
                Materialize.toast("Error in saving settings.", 1000);
                throw err;
            });
    }

    // discoverMoviesInDirectory(folderName: string, index: number) {
    //     var promises = this.movieDiscovery.discoverMoviesInDirectory(folderName);
    //     if (promises.length !== 0) {
    //         this.movieFoldersStatus[index].discovering = 0.01;
    //         let finishedCount = 0;
    //         promises.map(p => {
    //             p.then(movie => {
    //                 finishedCount++;
    //                 this.movieFoldersStatus[index].discovering = finishedCount * 100 / promises.length;
    //                 if (finishedCount === promises.length) {
    //                     Materialize.toast(`${finishedCount} movies discovered.`, 500);
    //                     this.movieFoldersStatus[index].discovering = 0;
    //                     this.movieFoldersStatus[index].discoveredCount = this.movieDiscovery.getDiscoveredMoviesInFolder(this.movieFoldersStatus[index].path);
    //                     this.movieFoldersStatus[index].unDiscoveredCount = this.movieDiscovery.getUnDiscoveredMoviesInFolder(this.movieFoldersStatus[index].path);
    //                 };
    //             }).catch(err => { throw err; });
    //         });
    //     }
    // }
    
    openFolder() {
        chrome.fileSystem.chooseEntry({ type: 'openDirectory' }, entry => {
            this.movieFoldersStatus.push({
                entry: entry,
                active: false
            });
            this.saveChanges();
        });
    }
}

interface MovieFolderStatus {
    entry: Entry;
    active: boolean;
    discovering?: number;
    discoveredCount?: number;
    unDiscoveredCount?: number;
}
