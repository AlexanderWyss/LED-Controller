import {Injectable} from "@angular/core";
import {ComProviderService} from "./com-provider.service";
import {ComService} from "./com.service";
import {Pattern} from "./pattern.service";

export interface PortInfo {
  serialports: string[];
  selectedPort: string;
}

@Injectable({
  providedIn: "root"
})
export class LEDService {

  BASE = "/api/";

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
    this.getCom().write(this.BASE + "leds/set", {leds: leds.toString()});
  }

  public getNumberOfLeds(): Promise<number> {
    return this.getCom().read(this.BASE + "leds/get").then(result => result.leds);
  }

  public setPin(pin: string) {
    this.getCom().write(this.BASE + "pin/set", {pin});
  }

  public getPin(): Promise<string> {
    return this.getCom().read(this.BASE + "pin/get").then(result => result.pin);
  }

  public getSerialports(): Promise<PortInfo> {
    return this.getCom().read(this.BASE + "serialport/get");
  }

  public setSerialport(port: string) {
    this.getCom().write(this.BASE + "serialport/set", {name: port});
  }

  private getCom(): ComService {
    return this.comProvider.getCom();
  }
}
