import {Injectable} from "@angular/core";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {File, FileEntry} from "@ionic-native/file/ngx";
import {Platform} from "@ionic/angular";
import {HttpComService} from "./http-com.service";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: "root"
})
export class UpdateService {

  constructor(private http: HttpComService, private appVersion: AppVersion, private plt: Platform, private file: File,
              private fileOpener: FileOpener, private toast: ToastService) {
  }

  async iAvailable(): Promise<boolean> {
    if (this.plt.is("cordova")) {
      return this.http.ready().then(() => {
        return Promise.all([
          this.appVersion.getVersionCode(),
          this.http.get("/files/output.json").then(info => info[0].apkInfo.versionCode)
        ]).then((results) => results[0] !== results[1])
          .catch(e => false);
      });
    }
    return false;
  }

  download() {
    this.toast.good("Downloading apk");
    return this.http.getFile("/files/app-debug.apk").then(blob => {
      return this.file.writeFile(this.file.externalRootDirectory + "/Download/", "app-debug.apk", blob, {replace: true})
        .then(fileEntry => {
          console.log((fileEntry as FileEntry).nativeURL);
          return this.fileOpener.open((fileEntry as FileEntry).nativeURL, "application/vnd.android.package-archive");
        });
    });
  }

  getRelativeUrl(): string {
    return "/files/app-debug.apk";
  }
}
