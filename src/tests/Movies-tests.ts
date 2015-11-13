import {Movies} from "../Core/Movies";
import {SettingsProvider} from "../Core/SettingsProvider";

let settingsProvider = new SettingsProvider();
let movies = new Movies(settingsProvider);
// movies.getAll()