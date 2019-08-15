import {Component} from "@angular/core";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";

import {Platform} from "@ionic/angular";
import {ToastService} from "./toast.service";
import {UpdateService} from "./update.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Patterns",
      url: "/patterns",
      icon: "color-palette"
    }, {
      title: "Settings",
      url: "/settings",
      icon: "color-palette"
    }
  ];
  updatesAvailable: boolean;
  isBrowser: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private updateService: UpdateService,
    private toast: ToastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isBrowser = !this.platform.is("cordova");
      this.updateService.iAvailable().then(isAvailable => {
        this.updatesAvailable = isAvailable;
      });
    });
  }

  update() {
    this.updateService.download().catch(e => this.toast.error("Something went wrong while downloading the apk."));
  }
}
