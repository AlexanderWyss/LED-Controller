import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ComService} from "./com.service";

@Injectable({
  providedIn: "root"
})
export class HttpComService extends ComService {

  private url = "";

  constructor(private http: HttpClient) {
    super("http");
  }

  write(name: string, data: object): Promise<object> {
    console.log("HTTP: Write: " + name + " " + JSON.stringify(data));
    return this.http.get(this.url + name, {params: data as any}).toPromise();
  }

  read(name: string): Promise<any> {
    console.log("HTTP: Read: " + name);
    return this.http.get(this.url + name).toPromise();
  }

  setUrl(url: string) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }
}
