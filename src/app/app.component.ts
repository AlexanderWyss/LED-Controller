import {Component} from "@angular/core";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";

import {Platform} from "@ionic/angular";
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private updateService: UpdateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.updateService.iAvailable().then(isAvailable => this.updatesAvailable = isAvailable);
    });
  }
}
