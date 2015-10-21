import {SettingsProvider} from "../Core/SettingsProvider"

import chai = require('chai');
var expect = chai.expect;

describe('Setting Provider Unit Tests:', () => {
    it("should load settings.json file on construct", () =>{
        var settingsProvider = new SettingsProvider("../settings.json");
        expect(settingsProvider.movieFolders.length > 0).to.equal(true);
    });
});