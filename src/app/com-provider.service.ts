import { Injectable } from "@angular/core";
import {BLE} from "@ionic-native/ble/ngx";
import {Platform} from "@ionic/angular";
import {BleComService} from "./ble-com.service";
import {ComService} from "./com.service";
import {HttpComService} from "./http-com.service";

@Injectable({
  providedIn: "root"
})
export class ComProviderService {

  private com: ComService;

  constructor(private httpCom: HttpComService, private bleCom: BleComService, private plt: Platform) {
    this.setInitialCom();
  }

  private setInitialCom(): void {
    this.deviceSupportsBluetooth().then(supportsBluetooth => {
      if (supportsBluetooth) {
        this.setBle();
      } else {
        this.setHttp();
      }
    });
  }

  public deviceSupportsBluetooth(): Promise<boolean> {
    return this.plt.ready().then((readySource) => this.plt.is("cordova"));
  }


  public setHttp() {
    console.log("HTTP");
    this.com = this.httpCom;
    this.bleCom.disconnect();
  }

  public setBle() {
    console.log("BLE");
    this.com = this.bleCom;
    this.bleCom.autoConnect();
  }

  public getCom(): ComService {
    return this.com;
  }

  public setHttpUrl(url: string) {
    this.httpCom.setUrl(url);
  }

  public getHttpUrl(): string {
    return this.httpCom.getUrl();
  }
}
