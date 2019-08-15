import {Component, OnInit, ViewChild} from "@angular/core";
import {IonRefresher} from "@ionic/angular";
import {ComProviderService} from "../com-provider.service";
import {LEDService, PortInfo} from "../led.service";
import {ToastService} from "../toast.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;

  private httpPrefix = "http://";

  portsInfo: PortInfo = {serialports: [], selectedPort: ""};
  numberOfLeds: number;
  pin: string;
  pins = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  com: string;
  url: string;
  selectCom: boolean;

  constructor(private ledService: LEDService, private comProvider: ComProviderService, private toast: ToastService) {
  }

  ngOnInit() {
    this.loadAll(this.refresher);
  }

  loadAll(refresher: any) {
    Promise.all([
      this.ledService.getSerialports().then(portsInfo => {
        this.portsInfo = portsInfo;
      }),
      this.comProvider.deviceSupportsBluetooth().then(supportsBle => {
        this.selectCom = supportsBle;
        if (supportsBle) {
          this.com = this.comProvider.getCom().getProtocol();
          this.url = this.comProvider.getHttpUrl();
        }
      }),
      this.ledService.getNumberOfLeds().then(numberOfLeds => this.numberOfLeds = numberOfLeds),
      this.ledService.getPin().then(pin => this.pin = pin)
    ]).catch((error) => {
      console.error(error);
      this.toast.error("Something went wrong while refreshing Settings");
    }).finally(() => refresher.complete());
  }

  setPort() {
    this.ledService.setSerialport(this.portsInfo.selectedPort);
  }

  setNumberOfLeds() {
    this.ledService.setNumberOfLeds(this.numberOfLeds);
  }

  setPin() {
    this.ledService.setPin(this.pin);
  }

  setCom() {
    switch (this.com) {
      case "ble":
        this.comProvider.setBle();
        break;
      case "http":
        this.comProvider.setHttp();
        break;
    }
  }

  setUrl() {
    let tempUrl = this.url.trim();
    if (tempUrl.startsWith(this.httpPrefix)) {
      tempUrl = tempUrl.substr(this.httpPrefix.length);
    }
    this.url = tempUrl;
    this.comProvider.setHttpUrl(this.url);
  }
}
