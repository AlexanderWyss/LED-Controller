import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ComService} from "./com.service";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: "root"
})
export class HttpComService extends ComService {
  private static PREFERENCES_URL_KEY = "httpcom.url";

  private url = "";

  constructor(private http: HttpClient, private preferences: PreferencesService) {
    super("http");
    this.loadUrlFromPreferences();
  }

  write(name: string, data: object): Promise<any> {
    console.log("HTTP: Write: " + name + " " + JSON.stringify(data));
    return this.http.get(this.url + name, {params: data as any}).toPromise();
  }

  read(name: string): Promise<any> {
    console.log("HTTP: Read: " + name);
    return this.http.get(this.url + name).toPromise();
  }


  setUrl(url: string) {
    this.url = url;
    this.preferences.set(HttpComService.PREFERENCES_URL_KEY, url);
  }

  getUrl() {
    return this.url;
  }

  private loadUrlFromPreferences() {
    this.preferences.get(HttpComService.PREFERENCES_URL_KEY, "").then(url => this.url = url);
  }

  close() {
    // noop
  }

  open() {
    // noop
  }
}
