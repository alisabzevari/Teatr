import {SettingsProvider} from "../../Core/SettingsProvider";
import {MovieDiscovery} from "../../Core/MovieDiscovery";
import {autoinject} from "aurelia-framework";
import {} from "materialize";

@autoinject()
export class Manage {
  public discovering: number[] = [];

  constructor(
    public settings: SettingsProvider,
    private movieDiscovery: MovieDiscovery) {
    this.discovering = new Array(settings.movieFolders.length);
  }

  saveChanges() {
    this.settings.saveChanges()
      .then(() => Materialize.toast("Settings Saved", 500))
      .catch(err => {
        Materialize.toast("Error in saving settings.", 500);
        throw err;
      });
  }

  discoverMoviesInDirectory(folderName: string, index: number) {
    var promises = this.movieDiscovery.discoverMoviesInDirectory(folderName);
    if (promises.length !== 0) {
      this.discovering[index] = 0.01;
      let finishedCount = 0;
      console.log(promises.length);
      console.group("Movies");
      promises.map(p => {
        p.then(movie => {
          // Materialize.toast(`Movie ${movie.title} discovered.`, 500);
          finishedCount++;
          this.discovering[index] = finishedCount * 100 / promises.length;
          console.log(`${finishedCount} : ${this.discovering[index]}%: ${movie.title}`);
          if (finishedCount === promises.length) {
            Materialize.toast(`${finishedCount} movies discovered.`, 500);
            this.discovering[index] = 0;
            console.groupEnd();
          };
        });
      });
    }
  }
}
