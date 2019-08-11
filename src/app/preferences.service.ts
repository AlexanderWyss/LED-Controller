import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class PreferencesService {

  constructor(private storage: Storage) {
  }

  public set(key: string, value: string): void {
    this.storage.ready().then(forage => this.storage.set(key, value));
  }

  public get(key: string, defaultValue?: string): Promise<any> {
    return this.storage.ready().then(forage => {
      return this.storage.get(key).then(value => {
        if (defaultValue !== undefined && value === null) {
          console.log("Using defaultValue with key: " + key);
          return defaultValue;
        }
        return value;
      });
    });
  }
}
