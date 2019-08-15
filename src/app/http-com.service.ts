import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ComService} from "./com.service";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: "root"
})
export class HttpComService extends ComService {
  private static PREFERENCES_URL_KEY = "httpcom.url";

  private url = "";
  private readonly loadPrefs: Promise<any>;

  constructor(private http: HttpClient, private preferences: PreferencesService) {
    super("http");
    this.loadPrefs = this.loadUrlFromPreferences();
  }

  write(name: string, data: object): Promise<any> {
    console.log("HTTP: Write: " + name + " " + JSON.stringify(data));
    return this.http.get(this.getUrlWithoutProtocol() + name, {params: data as any}).toPromise();
  }

  read(name: string): Promise<any> {
    console.log("HTTP: Read: " + name);
    return this.http.get(this.getUrlWithoutProtocol() + name).toPromise();
  }

  get(uri: string, headers?: HttpHeaders, params?: HttpParams): Promise<any> {
    return this.http.get(this.getUrlWithoutProtocol() + uri, {headers, params}).toPromise();
  }

  getFile(uri: string, headers?: HttpHeaders, params?: HttpParams): Promise<any> {
    return this.http.get(this.getUrlWithoutProtocol() + uri, {headers, params, responseType: "blob"}).toPromise();
  }

  setUrl(url: string) {
    this.url = url;
    this.preferences.set(HttpComService.PREFERENCES_URL_KEY, url);
  }

  getUrlWithoutProtocol() {
    return this.url;
  }

  public ready() {
    return this.loadPrefs;
  }

  private loadUrlFromPreferences() {
    return this.preferences.get(HttpComService.PREFERENCES_URL_KEY, "").then(url => this.url = url);
  }

  close() {
    // noop
  }

  open() {
    // noop
  }
}
