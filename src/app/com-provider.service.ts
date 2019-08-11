import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {BleComService} from "./ble-com.service";
import {ComService} from "./com.service";
import {HttpComService} from "./http-com.service";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: "root"
})
export class ComProviderService {

  private static PREFERENCES_COM_PROVIDER_KEY = "comprov.provider";

  private com: ComService;

  constructor(private httpCom: HttpComService, private bleCom: BleComService, private plt: Platform,
              private preference: PreferencesService) {
    this.setInitialCom();
  }

  private setInitialCom(): void {
    this.deviceSupportsBluetooth().then(supportsBluetooth => {
      if (supportsBluetooth) {
        this.preference.get(ComProviderService.PREFERENCES_COM_PROVIDER_KEY, this.bleCom.getProtocol())
          .then(provider => {
            switch (provider) {
              case this.bleCom.getProtocol():
                this.setBle();
                break;
              case this.httpCom.getProtocol():
                this.setHttp();
                break;
            }
          });
      } else {
        this.setHttp();
      }
    });
  }

  public deviceSupportsBluetooth(): Promise<boolean> {
    return this.plt.ready().then((readySource) => this.plt.is("cordova"));
  }


  public setHttp() {
    this.setCom(this.httpCom);
  }

  public setBle() {
    this.setCom(this.bleCom);
  }

  private setCom(com: ComService) {
    if (this.com) {
      this.com.close();
    }
    console.log(com.getProtocol());
    this.com = com;
    this.com.open();
    this.preference.set(ComProviderService.PREFERENCES_COM_PROVIDER_KEY, this.com.getProtocol());
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
