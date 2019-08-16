import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ComService} from "./com.service";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: "root"
})
export class HttpComService extends ComService {
  private static PREFERENCES_URL_KEY = "httpcom.url";

  private url = "";
  private readonly loadPrefs: Promise<any>;

  constructor(private http: HttpClient, private preferences: PreferencesService, private auth: AuthService) {
    super("http");
    this.loadPrefs = this.loadUrlFromPreferences();
  }

  write(name: string, data: object): Promise<any> {
    console.log("HTTP: Write: " + name + " " + JSON.stringify(data));
    return this.http.get(this.getUrl() + name, {params: this.withToken(data)}).toPromise();
  }

  read(name: string): Promise<any> {
    console.log("HTTP: Read: " + name);
    return this.http.get(this.getUrl() + name, {params: this.withToken()}).toPromise();
  }
  
  get(uri: string, headers?: HttpHeaders, params?: HttpParams): Promise<any> {
    return this.http.get(this.getUrl() + uri, {headers, params}).toPromise();
  }

  getFile(uri: string, headers?: HttpHeaders, params?: HttpParams): Promise<any> {
    return this.http.get(this.getUrl() + uri, {headers, params, responseType: "blob"}).toPromise();
  }

  setUrl(url: string) {
    this.url = url;
    this.preferences.set(HttpComService.PREFERENCES_URL_KEY, url);
  }

  getUrlWithoutProtocol() {
    return this.url;
  }

  getUrl() {
    return "http://" + this.url;
  }

  public ready() {
    return this.loadPrefs;
  }

  private loadUrlFromPreferences() {
    return this.preferences.get(HttpComService.PREFERENCES_URL_KEY, "").then(url => this.url = url);
  }

  protected withToken(params = {} as any): any {
    params.t = this.auth.getToken();
    return params;
  }

  close() {
    // noop
  }

  open() {
    // noop
  }
}
