import {Injectable} from "@angular/core";
import {BleComService} from "./ble-com.service";
import {ComProviderService} from "./com-provider.service";
import {ComService} from "./com.service";
import {HttpComService} from "./http-com.service";
import {Pattern} from "./pattern.service";

export interface SerialPort {
  comName: string;
  manufacturer?: string;
  serialNumber?: string;
  pnpId?: string;
  locationId?: string;
  productId?: string;
  vendorId?: string;
}

@Injectable({
  providedIn: "root"
})
export class LEDService {

  BASE = "/api/";
  private selectedPort: string;
  private numberOfLeds = 13;
  private pin = "2";

  constructor(private comProvider: ComProviderService) {
  }

  public start(name: string) {
    this.getCom().write(this.BASE + "start", {pattern: name});
  }

  public stop() {
    this.getCom().read(this.BASE + "stop");
  }

  public allOff() {
    this.getCom().read(this.BASE + "alloff");
  }

  public save(pattern: Pattern) {
    const data = {pattern: pattern.name};
    for (const patternSetting of pattern.patternSettings) {
      console.log(patternSetting.value.toString());
      data[patternSetting.name] = patternSetting.value.toString();
    }
    this.getCom().write(this.BASE + "options", data);
  }

  public setNumberOfLeds(leds: number) {
    this.numberOfLeds = leds;
    this.getCom().write(this.BASE + "options/leds/set", {leds: leds.toString()});
  }

  public getNumberOfLeds(): number {
    return this.numberOfLeds;
  }

  public setPin(pin: string) {
    this.pin = pin;
    this.getCom().write(this.BASE + "options/pin/set", {pin});
  }

  public getPin(): string {
    return this.pin;
  }

  public getSerialports(): Promise<SerialPort[]> {
    return this.getCom().read(this.BASE + "serialport/get").then((result: any) => result.serialports);
  }

  public setSerialport(port: string) {
    this.selectedPort = port;
    this.getCom().write(this.BASE + "serialport/set", {name: port});
  }

  public getSelectedPort() {
    return this.selectedPort;
  }

  private getCom(): ComService {
    return this.comProvider.getCom();
  }
}
