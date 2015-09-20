export class Settings {
  public settings: SettingItem[];
  constructor() {
    this.settings = [
      { active: true, path: "c:\\" },
      { active: false, path: "d:\\Movies" }
    ];
  }
}

export interface SettingItem {
  active: boolean;
  path: string;
}
