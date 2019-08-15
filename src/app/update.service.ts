import {Injectable} from "@angular/core";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {Platform} from "@ionic/angular";
import {HttpComService} from "./http-com.service";

@Injectable({
  providedIn: "root"
})
export class UpdateService {

  constructor(private http: HttpComService, private appVersion: AppVersion, private plt: Platform) {
  }

  async iAvailable(): Promise<boolean> {
    if (this.plt.is("cordova")) {
      return Promise.all([
        this.appVersion.getVersionCode(),
        this.http.read("/files/app-debug.apk").then(info => info[0].apkInfo.versionCode)
      ]).then((results) => results[0] !== results[1])
        .catch(e => false);
    }
    return false;
  }
}
