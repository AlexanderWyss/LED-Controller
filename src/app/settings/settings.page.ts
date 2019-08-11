import {Component, OnInit} from "@angular/core";
import {ComProviderService} from "../com-provider.service";
import {LEDService, SerialPort} from "../led.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {

  private httpPrefix = "http://";

  serialports: SerialPort[];
  selectedPort;
  numberOfLeds: number;
  pin: string;
  pins = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  com: string;
  url: string;
  selectCom: boolean;

  constructor(private ledService: LEDService, private comProvider: ComProviderService) {
  }

  ngOnInit() {
    this.initPort();
    this.numberOfLeds = this.ledService.getNumberOfLeds();
    this.pin = this.ledService.getPin();
    this.comProvider.deviceSupportsBluetooth().then(supportsBle => {
      console.log(supportsBle);
      this.selectCom = supportsBle;
      if (supportsBle) {
        this.com = this.comProvider.getCom().getProtocol();
        this.url = this.comProvider.getHttpUrl();
      }
    });
  }

  setPort() {
    this.ledService.setSerialport(this.selectedPort);
  }

  setNumberOfLeds() {
    this.ledService.setNumberOfLeds(this.numberOfLeds);
  }

  setPin() {
    this.ledService.setPin(this.pin);
  }

  private initPort() {
    this.ledService.getSerialports().then(serialports => this.serialports = serialports).catch(error => console.log(error));
    if (this.ledService.getSelectedPort()) {
      this.selectedPort = this.ledService.getSelectedPort();
    } else {
      this.selectedPort = "autoselect";
    }
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
    this.comProvider.setHttpUrl(this.httpPrefix + this.url);
  }
}
